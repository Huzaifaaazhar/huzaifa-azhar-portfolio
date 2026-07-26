export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

/**
 * Real client quotes only — nothing fabricated. The section renders
 * nothing until at least one is added here.
 */
export const testimonials: Testimonial[] = [];
