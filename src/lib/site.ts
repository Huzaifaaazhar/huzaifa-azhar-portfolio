/**
 * Global site configuration. Everything identity-related lives here so
 * copy/links are edited in one place.
 *
 * NEXT_PUBLIC_SITE_URL is a placeholder until a real domain is purchased —
 * see README "Domain & email deliverability".
 */
export const site = {
  name: "Huzaifa Azhar",
  role: "AI Consultant & Product Builder",
  location: "Karachi, Pakistan",
  hours: "works US-friendly hours",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "azharhuzaifa123@gmail.com",
  headline: "AI that earns its place in your business.",
  description:
    "AI consultant and product builder. I strategize, design and ship vertical AI products across logistics, healthcare, fintech, CCTV, agriculture and security.",
  knowsAbout: [
    "AI agents",
    "computer vision",
    "retrieval-augmented generation",
    "LLM fine-tuning",
    "workflow automation",
    "AI compliance",
  ],
  socials: {
    linkedin: "https://linkedin.com/in/huzaifa-azhar-3b8b8118b",
    github: "https://github.com/Huzaifaaazhar",
    medium: "https://medium.com/@azharhuzaifa123",
    kaggle: "https://www.kaggle.com/huzaifaazhar05",
  },
} as const;

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Products", href: "/products" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", href: `mailto:${site.email}` },
] as const;
