import { liveTestimonials } from "@/data/testimonials";
import { Section } from "@/components/ui/Section";
import { Constellation } from "@/components/motion/Constellation";
import { Reveal } from "@/components/motion/Reveal";

/** Renders nothing until there's at least one real (non-placeholder)
 * testimonial — same policy as the Writing teaser. */
export function Testimonials() {
  if (liveTestimonials.length === 0) return null;

  return (
    <Section
      id="testimonials"
      eyebrow="Testimonials"
      title="What it's like to work together."
    >
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {liveTestimonials.map((t) => (
          <figure key={t.id} className="panel flex flex-col gap-4 p-6 sm:p-8">
            <Constellation seed={t.id} className="h-20 w-full text-aurora-teal" />
            <Reveal delay={0.15}>
              <blockquote className="text-lg leading-relaxed text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm text-ink-dim">
                <span className="font-medium text-ink">{t.author}</span>
                {" — "}
                {t.role}, {t.company}
              </figcaption>
            </Reveal>
          </figure>
        ))}
      </div>
    </Section>
  );
}
