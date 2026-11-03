import { experience, education } from "@/data/experience";
import { FadeIn } from "@/components/ui/FadeIn";
import { ScrollFx } from "@/components/ui/ScrollFx";

export function PathSection() {
  return (
    <section id="path" className="px-5 py-20 sm:px-8 md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-12">
        <FadeIn className="lg:col-span-3 lg:col-start-1">
          <h2
            className="hero-heading leading-none tracking-tight lg:sticky lg:top-24"
            style={{ fontSize: "clamp(2.5rem, 9vw, 100px)" }}
          >
            Path
          </h2>
        </FadeIn>

        <div className="flex flex-col gap-12 lg:col-span-8 lg:col-start-5">
          {experience.map((entry, i) => (
            <FadeIn key={entry.company} delay={i * 0.1}>
              <ScrollFx y={26} rotateX={4} perspective={1000} enterOnly>
              <div className="border-l-2 border-[#2A342A] pl-6 sm:pl-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-medium text-[#F3F1E8] sm:text-2xl">
                    {entry.role} <span className="text-[#6E7A6B]">— {entry.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-[#6E7A6B]">
                    {entry.period}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-[#6E7A6B]">
                  {entry.location}
                </p>
                {entry.highlights.length > 0 && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {entry.highlights.map((h) => (
                      <li key={h} className="leading-relaxed text-[#A6B0A0]">
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              </ScrollFx>
            </FadeIn>
          ))}

          <FadeIn delay={experience.length * 0.1}>
            <h3 className="mt-8 font-mono text-xs text-[#6E7A6B]">Education</h3>
          </FadeIn>

          <div className="flex flex-col gap-8">
          {education.map((entry, i) => (
            <FadeIn key={entry.school} delay={experience.length * 0.1 + 0.1 + i * 0.1}>
              <div className="border-l-2 border-[#2A342A] pl-6 sm:pl-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-medium text-[#F3F1E8] sm:text-2xl">
                    {entry.degree} <span className="text-[#6E7A6B]">— {entry.school}</span>
                  </h3>
                  <span className="font-mono text-xs text-[#6E7A6B]">
                    {entry.period}
                  </span>
                </div>
                {entry.highlights.length > 0 && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {entry.highlights.map((h) => (
                      <li key={h} className="leading-relaxed text-[#A6B0A0]">
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
      </div>
    </section>
  );
}
