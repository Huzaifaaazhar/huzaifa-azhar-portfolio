export interface ExperienceEntry {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: "Salesflo",
    role: "AI Engineer",
    location: "Karachi, Pakistan",
    period: "May 2026 – Present",
    highlights: [
      "Built multi-tenant WhatsApp AI agents serving FMCG, Shopify e-commerce, and restaurant businesses on a platform handling 41K+ unique customer conversations",
      "Implemented Model Armor guardrails across tool calls and agentic workflows, hardening production agents against prompt injection and unsafe tool execution",
      "Shipped AI inbound voice-calling capability using Gemini Live and deployed services on AWS EC2",
    ],
  },
  {
    company: "HashMove",
    role: "Associate AI Engineer",
    location: "Karachi, Pakistan",
    period: "Feb 2025 – May 2026",
    highlights: [
      "Built an invoice reconciliation system for 165+ monthly shipments, cutting approval time from 48 hours to 2 hours",
      "Deployed an agentic risk analysis engine processing 200+ weekly assessments with real-time factors including geopolitics, trade wars, and weather on executive dashboards",
      "Built a data insight agent generating on-demand dashboards from natural-language queries, reducing BI workload",
      "Engineered an agentic document-processing pipeline (Claude Vision + PaddleOCR) handling 2,500+ documents daily, automating 70% of manual data entry",
      "Developed RAG-based customer-support agents (ChromaDB, 300+ embedded articles) achieving 89% first-contact resolution across 800+ daily queries",
      "Ran LLMOps for production services on an IIS server with Prometheus/Grafana monitoring",
    ],
  },
  {
    company: "Erly Stage Studios",
    role: "Junior AI Developer",
    location: "Remote",
    period: "Oct 2024 – Jan 2025",
    highlights: [
      "Developed a multi-agentic system using LangGraph with Gmail/WhatsApp APIs, cutting booking time from 15 min to 2 min",
      "Optimized LLM performance via prompt compression, prompt versioning, and caching, reducing latency from 8s to 3s",
      "Built Flask APIs on GCP Cloud Functions",
    ],
  },
];

export interface EducationEntry {
  school: string;
  degree: string;
  period: string;
  highlights: string[];
}

export const education: EducationEntry[] = [
  {
    school: "FAST NUCES",
    degree: "MS Data Science",
    period: "Aug 2026 – Present",
    highlights: [],
  },
  {
    school: "Karachi University, UBIT",
    degree: "BS Software Engineering",
    period: "Feb 2021 – Dec 2024",
    highlights: [
      "Final Year Project: Voice-based Mental Health Assistant using generative AI, applying a neural conversational model from research published in JMIR 2021",
    ],
  },
];
