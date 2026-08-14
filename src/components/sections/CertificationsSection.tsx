import { certifications } from "@/data/certifications";
import { FadeIn } from "@/components/ui/FadeIn";

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10"
    >
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <h2
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 9vw, 100px)" }}
          >
            Certifications
          </h2>
        </FadeIn>

        <div
          className="mt-16 sm:mt-20"
          style={{ borderTop: "1px solid rgba(215, 226, 234, 0.15)" }}
        >
          {certifications.map((cert, i) => (
            <FadeIn key={cert.title} delay={i * 0.1}>
              <div
                className="flex flex-wrap items-baseline justify-between gap-2 py-6"
                style={{ borderBottom: "1px solid rgba(215, 226, 234, 0.15)" }}
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-medium text-[#D7E2EA] sm:text-xl">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-[#D7E2EA]/60">{cert.issuer}</p>
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#D7E2EA]/50">
                  {cert.date}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
