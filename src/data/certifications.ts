export interface Certification {
  title: string;
  issuer: string;
  date: string;
  image: string;
  /**
   * "document" is a full certificate scan and fills the card edge to edge.
   * "badge" is a transparent achievement badge, so it renders centred and
   * inset instead of being blown up to the card's full width.
   */
  kind?: "document" | "badge";
}

export const certifications: Certification[] = [
  {
    title: "Beta Learn Student Ambassador",
    issuer: "Microsoft",
    date: "2024",
    image: "/certifications/microsoft-student-ambassador.jpg",
  },
  {
    title: "Microsoft Learn Cloud Skills Challenge",
    issuer: "Microsoft",
    date: "Ignite 2023",
    image: "/certifications/ms-cloud-skills-challenge.png",
    kind: "badge",
  },
  {
    title: "Microsoft Learn AI Skills Challenge",
    issuer: "Microsoft",
    date: "Aug 2023",
    image: "/certifications/ms-ai-skills-challenge.png",
    kind: "badge",
  },
  {
    title: "IBM Data Science Professional Certificate",
    issuer: "IBM (Coursera)",
    date: "Aug 2023",
    image: "/certifications/ibm-data-science.jpg",
  },
  {
    title: "Mathematics for Machine Learning and Data Science Specialization",
    issuer: "DeepLearning.AI (Coursera)",
    date: "Nov 2023",
    image: "/certifications/math-for-ml.jpg",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI & Stanford Online (Coursera)",
    date: "Nov 2023",
    image: "/certifications/ml-specialization.jpg",
  },
  {
    title: "McKinsey Forward Program",
    issuer: "McKinsey & Company",
    date: "Apr 2024",
    image: "/certifications/mckinsey-forward.jpg",
  },
  {
    title: "Microsoft Power Platform Fundamentals",
    issuer: "Microsoft (Coursera)",
    date: "Aug 2022",
    image: "/certifications/power-platform-fundamentals.jpg",
  },
  {
    title: "AI For Everyone",
    issuer: "DeepLearning.AI (Coursera)",
    date: "Aug 2022",
    image: "/certifications/ai-for-everyone.jpg",
  },
];
