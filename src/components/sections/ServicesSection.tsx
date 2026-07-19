import { FadeIn } from "@/components/ui/FadeIn";

const SERVICES = [
  {
    number: "01",
    name: "AI Agents",
    description:
      "Autonomous agents that use your real tools — calendar, inbox, CRM, spreadsheets — to handle tasks end to end, from scheduling to multi-step workflows.",
  },
  {
    number: "02",
    name: "Voice Interfaces",
    description:
      "Voice-first assistants with live speech recognition, natural text-to-speech, and function calling, wired into the systems your business already runs on.",
  },
  {
    number: "03",
    name: "Document Automation",
    description:
      "Document intelligence pipelines that read, extract, and reconcile at scale — turning manual data entry and paperwork into automated, reliable throughput.",
  },
  {
    number: "04",
    name: "RAG & Support Agents",
    description:
      "Retrieval-augmented systems and support agents grounded in your own knowledge base, cutting resolution times while keeping answers accurate and on-brand.",
  },
  {
    number: "05",
    name: "Automation & Deployment",
    description:
      "Designing, shipping, and monitoring production AI — clean architecture, real integrations, and systems that keep working after launch.",
  },
] as const;

export function ServicesSection() {
  return (
    <section
      id="services"
      className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <h2
        className="mb-16 text-center font-black uppercase text-[#0C0C0C] sm:mb-20 md:mb-28"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Services
      </h2>

      <div
        className="mx-auto max-w-5xl"
        style={{ borderTop: "1px solid rgba(12, 12, 12, 0.15)" }}
      >
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1}>
            <div
              className="flex items-center gap-6 py-8 sm:py-10 md:py-12"
              style={{ borderBottom: "1px solid rgba(12, 12, 12, 0.15)" }}
            >
              <span
                className="shrink-0 font-black text-[#0C0C0C]"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-2">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                >
                  {service.name}
                </h3>
                <p
                  className="max-w-2xl font-light leading-relaxed text-[#0C0C0C] opacity-60"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
