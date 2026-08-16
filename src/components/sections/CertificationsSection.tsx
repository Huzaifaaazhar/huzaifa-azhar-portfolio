import { certifications } from "@/data/certifications";
import { FadeIn } from "@/components/ui/FadeIn";

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="px-5 py-20 sm:px-8 md:px-10"
    >
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2
              className="hero-heading leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 9vw, 100px)" }}
            >
              Certifications
            </h2>
            <span className="font-mono text-sm text-[#4C5F5B]">
              {certifications.length} certificates
            </span>
          </div>
        </FadeIn>

        <div className="mt-16 flex flex-col gap-14 sm:mt-20">
          {certifications.map((cert, i) => (
            <FadeIn key={cert.title} delay={i * 0.1}>
              <div className="flex flex-col gap-5">
                <div
                  className={`overflow-hidden rounded-2xl border border-[#1A2A28] bg-[#101B1A] ${
                    cert.kind === "badge" ? "flex justify-center px-6 py-10" : ""
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cert.image}
                    alt={`${cert.title} ${cert.kind === "badge" ? "badge" : "certificate"}`}
                    loading="lazy"
                    decoding="async"
                    className={cert.kind === "badge" ? "w-full max-w-[280px]" : "w-full"}
                  />
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-medium text-[#EDF3F1] sm:text-xl">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-[#7B928D]">{cert.issuer}</p>
                  </div>
                  <span className="font-mono text-xs text-[#4C5F5B]">
                    {cert.date}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
