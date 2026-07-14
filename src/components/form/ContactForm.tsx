"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import {
  budgetOptions,
  contactSchema,
  projectTypeOptions,
  type ContactInput,
} from "@/lib/contact";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "fallback" } // API unavailable — lead routed via the visitor's email app
  | { kind: "error"; message: string };

type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const inputClass =
  "w-full rounded-lg border border-line bg-bg-2/80 px-4 py-3 text-ink placeholder:text-ink-faint transition-colors focus:border-aurora-teal";

function buildMailto(data: ContactInput): string {
  const subject = `Project inquiry from ${data.name}`;
  const lines = [
    data.message,
    "",
    `— ${data.name}`,
    data.company ? `Company: ${data.company}` : "",
    data.projectType ? `Project type: ${data.projectType}` : "",
    data.budget ? `Budget: ${data.budget}` : "",
    `Reply to: ${data.email}`,
  ].filter(Boolean);
  return `mailto:${site.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const parsed = contactSchema.safeParse(raw);

    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactInput;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error(`API responded ${res.status}`);
      setStatus({ kind: "success" });
      form.reset();
    } catch {
      // API not available (or down): never lose the lead — hand off to the
      // visitor's email app with everything pre-filled.
      window.location.href = buildMailto(parsed.data);
      setStatus({ kind: "fallback" });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="panel p-8" role="status">
        <h3 className="font-display text-xl font-semibold">
          Got it — thank you.
        </h3>
        <p className="mt-3 text-ink-dim">
          I read every message personally and reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm text-ink-dim">
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
            placeholder="Your name"
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm text-aurora-pink">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-ink-dim">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
            placeholder="you@company.com"
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-sm text-aurora-pink">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label
            htmlFor="company"
            className="mb-1.5 block text-sm text-ink-dim"
          >
            Company <span className="text-ink-faint">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className={inputClass}
            placeholder="Company"
          />
        </div>
        <div>
          <label
            htmlFor="projectType"
            className="mb-1.5 block text-sm text-ink-dim"
          >
            Project type <span className="text-ink-faint">(optional)</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            className={inputClass}
            defaultValue=""
          >
            <option value="" disabled>
              Choose…
            </option>
            {projectTypeOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="mb-1.5 block text-sm text-ink-dim">
            Budget <span className="text-ink-faint">(optional)</span>
          </label>
          <select
            id="budget"
            name="budget"
            className={inputClass}
            defaultValue=""
          >
            <option value="" disabled>
              Choose…
            </option>
            {budgetOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-ink-dim">
          What should stop being manual?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputClass}
          placeholder="Tell me about the process, the volume, and the tools it touches."
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-aurora-pink">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot — hidden from humans, bots fill it and get dropped server-side. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status.kind === "submitting"}
          className="rounded-full bg-aurora-green px-7 py-3 font-medium text-bg transition-transform hover:scale-[1.03] disabled:opacity-60"
        >
          {status.kind === "submitting" ? "Sending…" : "Send message"}
        </button>
        <p className="text-sm text-ink-faint">
          Or write directly:{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-aurora-teal underline underline-offset-4"
          >
            {site.email}
          </a>
        </p>
      </div>

      {status.kind === "fallback" && (
        <p role="status" className="text-sm text-ink-dim">
          Your email app should have opened with the message pre-filled — hit
          send there and I'll get it. If it didn't, email me at{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-aurora-teal underline underline-offset-4"
          >
            {site.email}
          </a>
          .
        </p>
      )}
      {status.kind === "error" && (
        <p role="alert" className="text-sm text-aurora-pink">
          {status.message}
        </p>
      )}
    </form>
  );
}
