/**
 * Testimonials data model (rendered in Phase 6 as the signature animated
 * section). Seeded with clearly-marked placeholders — replace `quote`,
 * `author`, `role`, `company` with real ones and set `placeholder: false`.
 */
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Optional path under /public, e.g. "/avatars/jane.jpg". */
  avatar?: string;
  /** Placeholder quotes are never rendered in production builds. */
  placeholder: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    quote:
      "[Placeholder] Huzaifa shipped a working system in the first week and kept improving it after launch.",
    author: "Client Name",
    role: "Operations Lead",
    company: "Company",
    placeholder: true,
  },
  {
    id: "placeholder-2",
    quote:
      "[Placeholder] The document pipeline paid for itself in the first month.",
    author: "Client Name",
    role: "Founder",
    company: "Company",
    placeholder: true,
  },
];

export const liveTestimonials = testimonials.filter((t) => !t.placeholder);
