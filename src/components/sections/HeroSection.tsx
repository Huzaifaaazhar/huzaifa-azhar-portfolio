import { Nav } from "@/components/ui/Nav";
import { ContactButton } from "@/components/ui/ContactButton";
import { Magnet } from "@/components/ui/Magnet";
import { FadeIn } from "@/components/ui/FadeIn";
import { site } from "@/lib/site";

/** Self-hosted portrait. The circular crop, feathered edge and teal bloom
 * are applied in CSS (see .portrait-* in globals.css). */
const PORTRAIT_SRC = "/portrait.webp";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col" style={{ overflowX: "clip" }}>
      <FadeIn delay={0} y={-20}>
        <Nav className="mx-auto w-full max-w-[1400px] px-6 pt-6 md:px-10 md:pt-8" />
      </FadeIn>

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 items-center px-6 py-14 md:px-10 md:py-20">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Left: name, a couple of lines, and the CTA. */}
          <div className="order-2 flex flex-col items-start gap-6 lg:order-1">
            <FadeIn delay={0.1} y={20}>
              <p className="font-mono text-xs tracking-[0.2em] text-[#82CFC0] sm:text-sm">
                {site.role}
              </p>
            </FadeIn>

            <FadeIn delay={0.18} y={30} as="h1" className="hero-heading leading-[1.05] tracking-tight text-[clamp(2.75rem,6vw,5rem)]">
              Hi, i&apos;m Huzaifa
            </FadeIn>

            <FadeIn delay={0.28} y={20}>
              <p className="max-w-[46ch] text-[clamp(1rem,1.3vw,1.2rem)] leading-relaxed text-[#7B928D]">
                {site.headline} I design and ship vertical AI products —
                strategy through deployment — across logistics, healthcare,
                fintech and security.
              </p>
            </FadeIn>

            <FadeIn delay={0.4} y={20} className="pt-2">
              <ContactButton />
            </FadeIn>
          </div>

          {/* Right: portrait, blended into the page with a teal bloom. */}
          <FadeIn delay={0.34} y={30} className="order-1 lg:order-2">
            <Magnet padding={120} strength={6} className="mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[360px]">
              <div className="portrait-frame">
                <span className="portrait-glow" aria-hidden="true" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PORTRAIT_SRC}
                  alt="Huzaifa Azhar, AI consultant and product builder"
                  className="portrait-img"
                />
              </div>
            </Magnet>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
