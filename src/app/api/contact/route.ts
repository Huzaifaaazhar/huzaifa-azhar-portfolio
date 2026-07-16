import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot means a bot — tell it submission succeeded so it
    // doesn't retry, without storing anything or alerting a human.
    if (parsed.error.issues.some((issue) => issue.path[0] === "website")) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const { name, email, message, company, budget, projectType } = parsed.data;

  const lead = await prisma.lead.create({
    data: { name, email, message, company: company || null, budget, projectType },
  });

  try {
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: [
        message,
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        projectType ? `Project type: ${projectType}` : null,
        budget ? `Budget: ${budget}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch (error) {
    // The lead is already durable in Neon — a delivery failure here must
    // never surface as a form error, or the visitor will resubmit.
    console.error("Failed to send contact notification email:", error);
  }

  return NextResponse.json({ ok: true, id: lead.id });
}
