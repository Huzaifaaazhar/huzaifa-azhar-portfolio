import { Nav } from "@/components/ui/Nav";
import { ContactButton } from "@/components/ui/ContactButton";
import { FadeIn } from "@/components/ui/FadeIn";
import { ScrollFx } from "@/components/ui/ScrollFx";
import { site } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col" style={{ overflowX: "clip" }}>
      <FadeIn delay={0} y={-20}>
        <Nav className="mx-auto w-full max-w-[1400px] px-6 pt-6 md:px-10 md:pt-8" />
      </FadeIn>

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 items-center px-6 py-14 md:px-10 md:py-20">
        <ScrollFx y={34} className="w-full">
          <div className="flex max-w-[52ch] flex-col items-start gap-6">
            <FadeIn delay={0.1} y={20}>
              <p className="font-mono text-xs tracking-[0.2em] text-[#2D7FFF] sm:text-sm">
                {site.role}
              </p>
            </FadeIn>

            <FadeIn delay={0.18} y={30} as="h1" className="hero-heading leading-[1.05] tracking-tight text-[clamp(2.75rem,6vw,5rem)]">
              Hi, i&apos;m Huzaifa
            </FadeIn>

            <FadeIn delay={0.28} y={20}>
              <p className="max-w-[46ch] text-[clamp(1rem,1.3vw,1.2rem)] leading-relaxed text-[#8A99B8]">
                {site.headline} I design and ship vertical AI products —
                strategy through deployment — across logistics, healthcare,
                fintech and security.
              </p>
            </FadeIn>

            <FadeIn delay={0.4} y={20} className="pt-2">
              <ContactButton />
            </FadeIn>
          </div>
        </ScrollFx>
      </div>
    </section>
  );
}
