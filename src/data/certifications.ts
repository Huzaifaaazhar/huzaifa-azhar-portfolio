export interface Certification {
  title: string;
  issuer: string;
  date: string;
  image: string;
}

export const certifications: Certification[] = [
  {
    title: "McKinsey Forward Program",
    issuer: "McKinsey & Company",
    date: "Apr 2024",
    image: "/certifications/mckinsey-forward.jpg",
  },
  {
    title: "Microsoft Learn Student Ambassador",
    issuer: "Microsoft",
    date: "2024",
    image: "/certifications/microsoft-student-ambassador.jpg",
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
    title: "IBM Data Science Professional Certificate",
    issuer: "IBM (Coursera)",
    date: "Aug 2023",
    image: "/certifications/ibm-data-science.jpg",
  },
];
