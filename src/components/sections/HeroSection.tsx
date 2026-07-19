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
          className="hero-heading mt-6 w-full whitespace-nowrap text-[14vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]"
        >
          Hi, i&apos;m Huzaifa
        </FadeIn>
      </div>

      <Magnet
        padding={150}
        strength={3}
        className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]"
      >
        <FadeIn delay={0.6} y={30}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PORTRAIT_SRC}
            alt="Portrait of Huzaifa Azhar"
            className="w-full"
          />
        </FadeIn>
      </Magnet>

      <div className="relative z-20 flex items-end justify-between pb-7 sm:pb-8 md:pb-10">
        <FadeIn delay={0.35} y={20} className="px-6 md:px-10">
          <p
            className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
          >
            an AI Engineer
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} className="px-6 md:px-10">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
