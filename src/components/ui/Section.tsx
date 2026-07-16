import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";

/** Shared section shell: consistent spacing, eyebrow label and heading. */
export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-aurora-green">
            {eyebrow}
          </p>
          <SplitHeading className="mb-10 max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance sm:mb-14 sm:text-4xl">
            {title}
          </SplitHeading>
        </Reveal>
        <Reveal delay={0.15}>{children}</Reveal>
      </div>
    </section>
  );
}
