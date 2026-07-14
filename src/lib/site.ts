/**
 * Global site configuration. Everything identity-related lives here so
 * copy/links are edited in one place.
 *
 * NEXT_PUBLIC_SITE_URL is a placeholder until a real domain is purchased —
 * see README "Domain & email deliverability".
 */
export const site = {
  name: "Huzaifa Azhar",
  role: "AI Engineer",
  location: "Karachi, Pakistan",
  hours: "works US-friendly hours",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "azharhuzaifa123@gmail.com",
  headline: "I build AI systems that do real work.",
  description:
    "Voice agents, document pipelines and automation for operations-heavy businesses — built end-to-end by one engineer.",
  socials: {
    linkedin: "https://www.linkedin.com/in/huzaifaazhar-3b8b8118b",
    github: "https://github.com/Huzaifaaazhar",
    medium: "https://medium.com/@azharhuzaifa123",
  },
} as const;

export const nav = [
  { label: "Products", href: "/#products" },
  { label: "Approach", href: "/#approach" },
  { label: "Contact", href: "/#contact" },
] as const;
