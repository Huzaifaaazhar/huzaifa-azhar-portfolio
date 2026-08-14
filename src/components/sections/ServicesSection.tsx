import { FadeIn } from "@/components/ui/FadeIn";

const SERVICES = [
  {
    number: "01",
    name: "AI Opportunity Audit",
    description:
      "A structured review of your operations to find where AI creates real ROI — and where it doesn't. You get a ranked shortlist of use cases scored by impact, effort, and risk, so you know what's worth building before you spend a dollar.",
  },
  {
    number: "02",
    name: "AI Product Strategy & Roadmapping",
    description:
      "I act as your fractional AI product lead, defining the problem, the buyer, the MVP scope, and the phased build order — turning a model into something customers actually pay for and keep using.",
  },
  {
    number: "03",
    name: "Custom AI Agent & Automation Development",
    description:
      "Agents that use your real tools — inbox, CRM, calendar, internal APIs — to complete multi-step work end to end, scoped, deployed, and monitored. Autonomous workflows, not another chatbot demo.",
  },
  {
    number: "04",
    name: "Computer Vision & Video Intelligence",
    description:
      "Vision systems that turn cameras and images into decisions — detection, counting, tracking, quality inspection, and anomaly alerts — deployable on your existing CCTV or edge devices.",
  },
  {
    number: "05",
    name: "Document Intelligence & Data Extraction",
    description:
      "Pipelines that read messy documents — invoices, forms, contracts, shipping paperwork — and turn them into structured, validated data that flows into your systems, killing manual entry and the errors that come with it.",
  },
  {
    number: "06",
    name: "RAG & Knowledge Systems",
    description:
      "Retrieval-augmented assistants grounded in your own policies, docs, and product knowledge, so answers are accurate, current, and traceable to a source — support and internal answers stop being guesswork.",
  },
  {
    number: "07",
    name: "AI Compliance & Governance Advisory",
    description:
      "Help shipping AI that regulators and enterprise buyers will accept — risk assessment, audit trails, evaluation frameworks, and guardrails. In regulated industries, provably safe and documented is the moat.",
  },
  {
    number: "08",
    name: "Fractional AI Team / Ongoing Partnership",
    description:
      "A retained engagement where I'm your on-call AI lead — building, monitoring, iterating, and advising as needs evolve, instead of a one-off project abandoned at launch.",
  },
] as const;

export function ServicesSection() {
  return (
    <section
      id="services"
      className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <h2
        className="mb-16 text-center font-serif font-black uppercase text-[#0C0C0C] sm:mb-20 md:mb-28"
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
