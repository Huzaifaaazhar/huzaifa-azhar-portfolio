export interface Certification {
  title: string;
  issuer: string;
  date: string;
}

export const certifications: Certification[] = [
  {
    title: "McKinsey Forward Program",
    issuer: "McKinsey & Company",
    date: "Apr 2024",
  },
  {
    title: "Microsoft Learn Student Ambassador",
    issuer: "Microsoft",
    date: "2024",
  },
  {
    title: "Mathematics for Machine Learning and Data Science Specialization",
    issuer: "DeepLearning.AI (Coursera)",
    date: "Nov 2023",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI & Stanford Online (Coursera)",
    date: "Nov 2023",
  },
  {
    title: "IBM Data Science Professional Certificate",
    issuer: "IBM (Coursera)",
    date: "Aug 2023",
  },
];
