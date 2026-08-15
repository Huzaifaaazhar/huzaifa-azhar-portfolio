import { experience, education } from "@/data/experience";
import { FadeIn } from "@/components/ui/FadeIn";

export function PathSection() {
  return (
    <section id="path" className="bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <h2
            className="hero-heading text-center leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 9vw, 100px)" }}
          >
            Path
          </h2>
        </FadeIn>

        <div className="mt-16 flex flex-col gap-12 sm:mt-20">
          {experience.map((entry, i) => (
            <FadeIn key={entry.company} delay={i * 0.1}>
              <div className="border-l-2 border-[#D7E2EA]/20 pl-6 sm:pl-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-medium text-[#D7E2EA] sm:text-2xl">
                    {entry.role} <span className="text-[#D7E2EA]/50">— {entry.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-[#D7E2EA]/50">
                    {entry.period}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-[#D7E2EA]/40">
                  {entry.location}
                </p>
                {entry.highlights.length > 0 && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {entry.highlights.map((h) => (
                      <li key={h} className="leading-relaxed text-[#D7E2EA]/70">
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={experience.length * 0.1}>
          <h3 className="mt-20 font-mono text-xs text-[#D7E2EA]/50 sm:mt-24">
            Education
          </h3>
        </FadeIn>
        <div className="mt-6 flex flex-col gap-8">
          {education.map((entry, i) => (
            <FadeIn key={entry.school} delay={experience.length * 0.1 + 0.1 + i * 0.1}>
              <div className="border-l-2 border-[#D7E2EA]/20 pl-6 sm:pl-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-medium text-[#D7E2EA] sm:text-2xl">
                    {entry.degree} <span className="text-[#D7E2EA]/50">— {entry.school}</span>
                  </h3>
                  <span className="font-mono text-xs text-[#D7E2EA]/50">
                    {entry.period}
                  </span>
                </div>
                {entry.highlights.length > 0 && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {entry.highlights.map((h) => (
                      <li key={h} className="leading-relaxed text-[#D7E2EA]/70">
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
