import { faqs } from "@/data/faq";
import { FadeIn } from "@/components/ui/FadeIn";
import { FaqJsonLd } from "@/components/JsonLd";

export function FaqSection() {
  return (
    <section id="faq" className="px-5 py-20 sm:px-8 md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-12">
        <FadeIn className="lg:col-span-3 lg:col-start-1">
          <h2
            className="hero-heading leading-none tracking-tight lg:sticky lg:top-24"
            style={{ fontSize: "clamp(2.5rem, 9vw, 100px)" }}
          >
            FAQ
          </h2>
        </FadeIn>

        <div
          className="lg:col-span-8 lg:col-start-5"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          {faqs.map((faq, i) => (
            <FadeIn key={faq.question} delay={i * 0.1}>
              <div
                className="flex flex-col gap-3 py-8"
                style={{ borderBottom: "1px solid var(--line)" }}
              >
                <h3 className="text-lg font-medium text-[#2B2219] sm:text-xl">
                  {faq.question}
                </h3>
                <p className="leading-relaxed text-[#6B5B4C]">{faq.answer}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <FaqJsonLd faqs={faqs} />
    </section>
  );
}
