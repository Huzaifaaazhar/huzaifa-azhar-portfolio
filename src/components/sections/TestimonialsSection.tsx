import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "@/components/sections/TestimonialCard";

export function TestimonialsSection() {
  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="px-5 py-20 sm:px-8 md:px-10"
      style={{ zIndex: 10, position: "relative" }}
    >
      <h2
        className="hero-heading mb-16 text-center leading-none tracking-tight sm:mb-20 md:mb-28"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Testimonials
      </h2>

      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        {testimonials.map((testimonial, i) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            index={i}
            total={testimonials.length}
          />
        ))}
      </div>
    </section>
  );
}
