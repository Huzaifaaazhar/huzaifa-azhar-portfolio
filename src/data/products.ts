/**
 * Products are structured cases, not card blurbs. Every field renders on
 * /products; `teaser: true` also surfaces the product on the homepage.
 *
 * `status`:
 *  - "production"     → running live inside a business (no public URL)
 *  - "live"           → publicly usable; `liveUrl` required
 *  - "in-development" → not yet shippable; rendered with a badge instead of a link
 */
export type ProductStatus = "production" | "live" | "in-development";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  /** What was broken before this existed. */
  problem: string;
  /** Who it's for and why they need it. */
  marketFit: string;
  /** What it does / how it works. */
  solution: string;
  tech: string[];
  status: ProductStatus;
  /** Public URL — fill in when a product ships publicly. */
  liveUrl?: string;
  metrics?: string[];
  /** Show on the homepage teaser. */
  teaser?: boolean;
}

export const statusLabel: Record<ProductStatus, string> = {
  production: "In production",
  live: "Live",
  "in-development": "In development",
};

export const products: Product[] = [
  {
    slug: "document-intelligence-pipeline",
    name: "Document Intelligence Pipeline",
    tagline: "Freight paperwork that files itself.",
    problem:
      "At HashMove, a logistics SaaS, operations teams were re-typing thousands of shipping documents a day — invoices, bills of lading, packing lists. Manual entry was the bottleneck on every shipment and the main source of data errors.",
    marketFit:
      "Any operations-heavy business that runs on scanned paperwork — freight brokerages, logistics providers, back offices — where adding volume today means adding headcount.",
    solution:
      "A pipeline combining Claude Vision and PaddleOCR that reads incoming documents, classifies them, extracts the structured fields, validates them against business rules and pushes clean data into the platform. Humans only review low-confidence extractions.",
    tech: ["Claude Vision", "PaddleOCR", "Python"],
    status: "production",
    metrics: [
      "2,500+ documents processed per day",
      "Automated ~70% of manual data entry",
    ],
    teaser: true,
  },
  {
    slug: "rag-support-agents",
    name: "RAG Customer-Support Agents",
    tagline: "Support that answers in seconds, not queues.",
    problem:
      "Support agents were spending most of every ticket hunting through documentation. Average resolution sat around 12 minutes, and answers varied by who happened to pick up the ticket.",
    marketFit:
      "Teams with a real knowledge base and a ticket queue — SaaS companies, agencies, e-commerce operations — who want faster, consistent answers without growing the support team.",
    solution:
      "Retrieval-augmented agents over 10,000+ embedded knowledge-base articles in ChromaDB. The agent retrieves the relevant material, drafts the grounded answer and cites its sources, so a human can approve in seconds.",
    tech: ["ChromaDB", "RAG", "LLM orchestration", "Python"],
    status: "production",
    metrics: ["10K+ embedded articles", "Ticket resolution: ~12 min → 3–4 min"],
    teaser: true,
  },
  {
    slug: "shipment-risk-analyzer",
    name: "Shipment Risk Analyzer",
    tagline: "Know which shipments will go wrong before they do.",
    problem:
      "Freight teams found out about delays and compliance problems after they happened — when a customer called. Risk lived in scattered signals nobody had time to watch.",
    marketFit:
      "Freight brokerages and logistics operators managing live shipments, where one missed delay or compliance slip costs far more than the software that catches it.",
    solution:
      "A RAG system fused with external data APIs that scores live freight for delay and compliance risk, surfacing the shipments that need attention now. Running in production.",
    tech: ["RAG", "External data APIs", "Python"],
    status: "production",
    teaser: true,
  },
  {
    slug: "jarvis-voice-assistant",
    name: "Jarvis — Voice Assistant",
    tagline: "A voice agent that answers, triages and acts.",
    problem:
      "Small businesses miss calls constantly — and every missed call is a lead that dials the next company on the list. Hiring someone to answer phones around the clock doesn't pencil out.",
    marketFit:
      "Owner-operated businesses that live on inbound calls — service companies, stores, brokerages — that need every call answered without staffing a phone desk.",
    solution:
      "A real-time voice assistant that picks up, understands the request, answers from business knowledge, and hands off or escalates to a human when it should — with a transcript of every conversation.",
    tech: ["Real-time speech", "LLM agents", "Python"],
    status: "in-development",
  },
  {
    slug: "rppg-vitals-monitor",
    name: "rPPG Vitals Monitor",
    tagline: "Vital signs from a plain camera.",
    problem:
      "Measuring heart rate normally means contact hardware — cuffs, straps, wearables. That's friction (and cost) anywhere you'd like a quick, contactless reading.",
    marketFit:
      "Wellness and telehealth products that want vitals capture with zero extra hardware — anything with a camera can take a reading.",
    solution:
      "Remote photoplethysmography (rPPG): the system amplifies subtle skin-color changes in ordinary video to estimate heart rate and related vitals, no contact required.",
    tech: ["Computer vision", "rPPG signal processing", "Python"],
    status: "in-development",
  },
];

export const teaserProducts = products.filter((p) => p.teaser);
