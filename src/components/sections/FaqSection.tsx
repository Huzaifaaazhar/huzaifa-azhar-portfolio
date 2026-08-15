import { faqs } from "@/data/faq";
import { FadeIn } from "@/components/ui/FadeIn";
import { FaqJsonLd } from "@/components/JsonLd";

export function FaqSection() {
  return (
    <section id="faq" className="bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <h2
            className="hero-heading text-center leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 9vw, 100px)" }}
          >
            FAQ
          </h2>
        </FadeIn>

        <div
          className="mt-16"
          style={{ borderTop: "1px solid rgba(215, 226, 234, 0.15)" }}
        >
          {faqs.map((faq, i) => (
            <FadeIn key={faq.question} delay={i * 0.1}>
              <div
                className="flex flex-col gap-3 py-8"
                style={{ borderBottom: "1px solid rgba(215, 226, 234, 0.15)" }}
              >
                <h3 className="text-lg font-medium text-[#D7E2EA] sm:text-xl">
                  {faq.question}
                </h3>
                <p className="leading-relaxed text-[#D7E2EA]/70">{faq.answer}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <FaqJsonLd faqs={faqs} />
    </section>
  );
}
