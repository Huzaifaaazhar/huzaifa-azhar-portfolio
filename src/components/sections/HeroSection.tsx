import { Nav } from "@/components/ui/Nav";
import { ContactButton } from "@/components/ui/ContactButton";
import { Magnet } from "@/components/ui/Magnet";
import { FadeIn } from "@/components/ui/FadeIn";

const PORTRAIT_SRC =
  "https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png";

export function HeroSection() {
  return (
    <section
      className="relative flex h-screen flex-col"
      style={{ overflowX: "clip" }}
    >
      <FadeIn delay={0} y={-20}>
        <Nav className="px-6 pt-6 md:px-10 md:pt-8" />
      </FadeIn>

      <div className="overflow-hidden">
        <FadeIn
          delay={0.15}
          y={40}
          as="h1"
          // Set on one line, so the size is bounded by the string's width:
          // at 15vw it fills ~93% of the viewport at every breakpoint,
          // leaving margin for the Georgia fallback. Raising this much
          // further runs the text off the side.
          className="hero-heading mt-6 w-full whitespace-nowrap text-[15vw] leading-none tracking-tight sm:mt-4 md:-mt-5"
        >
          Hi, i&apos;m Huzaifa
        </FadeIn>
      </div>

      {/* The portrait gets exactly the space left between the heading and
          the footer row, so a short laptop viewport can't push it up over
          the name the way a bottom-anchored absolute box did. */}
      <div className="relative z-10 min-h-0 flex-1">
        <Magnet
          padding={150}
          strength={3}
          className="absolute inset-0 flex items-end justify-center"
        >
          <FadeIn
            delay={0.6}
            y={30}
            className="flex h-full w-full items-end justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PORTRAIT_SRC}
              alt="Huzaifa Azhar, AI consultant and product builder"
              className="max-h-full w-auto max-w-[280px] object-contain object-bottom sm:max-w-[360px] md:max-w-[440px] lg:max-w-[520px]"
            />
          </FadeIn>
        </Magnet>
      </div>

      <div className="relative z-20 flex items-end justify-between pb-7 sm:pb-8 md:pb-10">
        <FadeIn delay={0.35} y={20} className="px-6 md:px-10">
          <p
            className="max-w-[160px] font-mono font-light uppercase leading-snug tracking-wide text-[#EDF3F1] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
          >
            AI Consultant &amp; Product Builder
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} className="px-6 md:px-10">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
