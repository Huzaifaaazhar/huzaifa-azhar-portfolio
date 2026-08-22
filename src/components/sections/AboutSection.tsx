import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ContactButton } from "@/components/ui/ContactButton";

const DECOR_BASE =
  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7";

const PARAGRAPH =
  "Not just an engineer, i'm an AI consultant, product strategist, and builder. i help companies decide what AI is actually worth building, then design and ship it end-to-end across logistics, healthcare, fintech, and security, skipping the agency overhead and the six-month discovery decks. Let's build something incredible together!";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10"
    >
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${DECOR_BASE}/moon_icon.11395d36.png`}
          alt=""
          aria-hidden="true"
          className="absolute left-[3%] top-[6%] hidden max-h-[200px] w-[180px] object-contain xl:block 2xl:w-[210px]"
        />
      </FadeIn>
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${DECOR_BASE}/p59_1.4659672e.png`}
          alt=""
          aria-hidden="true"
          className="absolute bottom-[10%] left-[5%] hidden max-h-[170px] w-[150px] object-contain xl:block 2xl:w-[180px]"
        />
      </FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${DECOR_BASE}/lego_icon-1.703bb594.png`}
          alt=""
          aria-hidden="true"
          className="absolute right-[3%] top-[6%] hidden max-h-[200px] w-[180px] object-contain xl:block 2xl:w-[210px]"
        />
      </FadeIn>
      <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${DECOR_BASE}/Group_134-1.2e04f3ce.png`}
          alt=""
          aria-hidden="true"
          className="absolute bottom-[10%] right-[5%] hidden max-h-[190px] w-[160px] object-contain xl:block 2xl:w-[200px]"
        />
      </FadeIn>

      <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading text-center leading-none tracking-tight"
              style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            >
              About me
            </h2>
          </FadeIn>

          <AnimatedText
            text={PARAGRAPH}
            className="max-w-[560px] text-center font-medium leading-relaxed text-[#EDF3F1] text-[clamp(1rem,2vw,1.35rem)]"
          />
        </div>

        <ContactButton />
      </div>
    </section>
  );
}
