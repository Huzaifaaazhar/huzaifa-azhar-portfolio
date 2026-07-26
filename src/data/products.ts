/**
 * Products are structured cases, not card blurbs. Every field renders on
 * /products and on each product's own /products/[slug] page.
 *
 * `status`:
 *  - "production"     → running live inside a business (no public URL)
 *  - "live"           → publicly usable; `liveUrl` required
 *  - "in-development" → not yet shippable; rendered with a badge instead of a link
 *
 * None of these ship a demo yet, so all are "in-development" with no
 * `liveUrl` and no fabricated metrics — real numbers get added once a
 * build actually has usage to report.
 */
export type ProductStatus = "production" | "live" | "in-development";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  /** The industry or market this system was built for. */
  industry: string;
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
}

export const statusLabel: Record<ProductStatus, string> = {
  production: "In production",
  live: "Live",
  "in-development": "In development",
};

export const products: Product[] = [
  // Logistics & Supply Chain
  {
    slug: "lademind",
    name: "LadeMind — Shipping Document Auto-Reader",
    tagline: "Freight paperwork that reads itself.",
    industry: "Logistics & Supply Chain",
    problem:
      "Freight brokers and 3PLs drown in bills of lading, rate confirmations, and customs forms that get keyed in by hand — slow, error-prone, and impossible to scale during peak.",
    marketFit:
      "Freight brokerages, 3PLs, and logistics back offices running on scanned or emailed paperwork.",
    solution:
      "A document-intelligence app that ingests scanned or emailed shipping paperwork, extracts every field — shipper, consignee, weight, HS codes, charges — validates it against expected ranges, and pushes clean structured data to a TMS or spreadsheet.",
    tech: ["Vision-LLM extraction", "Validation rules", "Python"],
    status: "in-development",
  },
  {
    slug: "transitguard",
    name: "TransitGuard — Shipment Delay & Risk Predictor",
    tagline: "Know a shipment's in trouble before the customer calls.",
    industry: "Logistics & Supply Chain",
    problem:
      "Ops teams find out a load is late only when the customer calls — there's no early warning to intervene.",
    marketFit:
      "Freight brokerages and logistics operators managing live shipments.",
    solution:
      "A risk-scoring service that pulls lane, carrier, weather, and historical-transit signals to flag at-risk shipments before they slip, with a plain-English reason and a suggested action.",
    tech: ["RAG", "Risk scoring model", "External data APIs"],
    status: "in-development",
  },
  {
    slug: "ratesense",
    name: "RateSense — Freight Quote Benchmarker",
    tagline: "Quote with data, not gut feel.",
    industry: "Logistics & Supply Chain",
    problem:
      "Small brokers quote lanes on gut feel and either lose margin or lose the load.",
    marketFit:
      "Small and mid-size freight brokers pricing lanes without a data team.",
    solution:
      "A tool that suggests a competitive quote range for a lane from historical and market signals, with confidence and margin guidance.",
    tech: ["Market data analysis", "Pricing models", "Python"],
    status: "in-development",
  },
  {
    slug: "quoteflow",
    name: "QuoteFlow — Quotation & Invoice Auto-Approval",
    tagline: "One click from quote to approved invoice.",
    industry: "Logistics & Supply Chain",
    problem:
      "Approving quotes and invoices is a manual, multi-step chase across email and spreadsheets, slowing down every deal and every payment cycle.",
    marketFit:
      "Operations and finance teams who currently approve quotes and invoices one at a time, by hand.",
    solution:
      "A workflow that checks a quote or invoice against agreed terms and pricing rules, flags anything out of range, and lets a manager approve compliant ones in a single click — with everything else routed for review.",
    tech: ["Workflow automation", "Rules engine", "Python"],
    status: "in-development",
  },

  // Healthcare
  {
    slug: "claimappeal-ai",
    name: "ClaimAppeal AI — Denied Claim Recovery",
    tagline: "Turn denied claims into recovered revenue.",
    industry: "Healthcare",
    problem:
      "Clinics lose real revenue to denied insurance claims because writing appeals is slow, manual work few staff have time for.",
    marketFit: "Clinics and medical billing teams writing appeals by hand today.",
    solution:
      "A tool that reads a denial, retrieves the relevant policy and patient record, and drafts a source-cited appeal letter for staff to review and send.",
    tech: ["Document AI", "RAG", "LLM drafting"],
    status: "in-development",
  },
  {
    slug: "intakescribe",
    name: "IntakeScribe — Patient Intake & Summary Assistant",
    tagline: "A clean pre-visit summary, every time.",
    industry: "Healthcare",
    problem:
      "Front-desk and clinical staff re-key intake forms and hunt through history before every visit.",
    marketFit: "Clinics and practices handling paper or PDF intake forms.",
    solution:
      "An assistant that turns intake forms and prior notes into a clean, structured pre-visit summary, flagging gaps and allergies.",
    tech: ["Document AI", "Grounded summarization"],
    status: "in-development",
  },
  {
    slug: "carecall-agent",
    name: "CareCall Agent — Appointment & Follow-up Voice Agent",
    tagline: "Reminder calls and follow-ups that actually happen.",
    industry: "Healthcare",
    problem:
      "No-shows and missed follow-ups cost clinics money, and reminder calls don't get made.",
    marketFit:
      "Clinics and practices losing revenue to no-shows and skipped follow-ups.",
    solution:
      "A voice/SMS agent that confirms appointments, handles reschedules against the calendar, and runs follow-up check-ins — escalating anything clinical to staff.",
    tech: ["Real-time speech", "Calendar integration", "LLM agents"],
    status: "in-development",
  },

  // Fintech
  {
    slug: "reconcile-ai",
    name: "ReconcileAI — Transaction Reconciliation Agent",
    tagline: "Reconciliation without the spreadsheet marathon.",
    industry: "Fintech",
    problem:
      "Finance teams manually match statements, ledgers, and invoices — tedious, error-prone, and always behind.",
    marketFit:
      "Finance and accounting teams reconciling multiple sources by hand each month.",
    solution:
      "An agent that reconciles transactions across sources, flags mismatches with reasons, and holds every action for human approval before anything posts.",
    tech: ["Workflow automation", "LLM agents", "Python"],
    status: "in-development",
  },
  {
    slug: "statement-sense",
    name: "StatementSense — Financial Statement Analyzer",
    tagline: "Read a statement in seconds, not hours.",
    industry: "Fintech",
    problem:
      "Lenders and analysts spend hours reading statements to assess a small business.",
    marketFit:
      "Lenders, analysts, and underwriters reviewing financial statements manually.",
    solution:
      "A tool that extracts figures from uploaded statements, computes key ratios, and writes a plain-English risk summary with the numbers cited.",
    tech: ["Document AI", "Financial modeling", "LLM summarization"],
    status: "in-development",
  },
  {
    slug: "alphasignal",
    name: "AlphaSignal — AI-Driven Systematic Trading Engine",
    tagline: "Quant-style strategy research, without the quant team.",
    industry: "Fintech",
    problem:
      "Systematic trading strategies normally require an expensive quant team and infrastructure that most independent traders and small funds can't justify.",
    marketFit:
      "Independent traders and small funds wanting systematic, data-driven strategies without building a quant desk. Research and execution tooling, not investment advice.",
    solution:
      "An AI system that analyzes market data and signals to backtest and run systematic trading strategies, with position sizing and risk limits built in.",
    tech: ["Quantitative modeling", "Market data pipelines", "Python"],
    status: "in-development",
  },

  // CCTV & Physical Security
  {
    slug: "loiterwatch",
    name: "LoiterWatch — Theft & Suspicious-Behavior Alerts",
    tagline: "Your cameras, watching for trouble in real time.",
    industry: "CCTV & Physical Security",
    problem:
      "Small retailers can't watch every camera; theft and loitering are caught only after the fact.",
    marketFit:
      "Small retailers and shop owners running standard CCTV with no active monitoring.",
    solution:
      "A vision layer on existing CCTV that flags loitering, unusual dwell, and after-hours motion in real time, sending a clip and alert to the owner's phone.",
    tech: ["Computer vision", "YOLO / OpenCV", "Real-time alerting"],
    status: "in-development",
  },
  {
    slug: "queuesense",
    name: "QueueSense — Footfall & Queue Analytics",
    tagline: "Staff to the traffic you actually get.",
    industry: "CCTV & Physical Security",
    problem:
      "Store and clinic managers guess at staffing because they have no real people-flow data.",
    marketFit: "Retail stores and clinics staffing without real footfall data.",
    solution:
      "A vision tool that counts footfall, measures queue length and dwell time from existing cameras, and dashboards peak patterns for staffing.",
    tech: ["Computer vision", "Video analytics", "Dashboards"],
    status: "in-development",
  },

  // Agriculture
  {
    slug: "cropscout",
    name: "CropScout — Early Pest & Disease Detection",
    tagline: "Catch crop disease before it spreads.",
    industry: "Agriculture",
    problem:
      "Farmers and greenhouses spot disease only once it's spread, losing yield and over-spraying chemicals.",
    marketFit: "Farmers and greenhouse operators scouting crops manually.",
    solution:
      "A vision app that scans crop photos or greenhouse-camera frames daily, detects early disease and pest signs across common classes, and maps affected zones for targeted treatment.",
    tech: ["Computer vision", "Image classification", "Python"],
    status: "in-development",
  },

  // IT & Networking
  {
    slug: "logsense",
    name: "LogSense — Log & Incident Summarizer",
    tagline: "Find root cause without scrolling a million lines.",
    industry: "IT & Networking",
    problem:
      "During incidents, engineers scroll thousands of log lines to find the cause.",
    marketFit: "Engineering and ops teams triaging incidents from raw logs.",
    solution:
      "A tool that ingests logs, clusters errors, and produces a plain-English incident summary with the likely root cause and affected services.",
    tech: ["Log processing", "LLM summarization", "Clustering"],
    status: "in-development",
  },

  // AI Compliance
  {
    slug: "evalguard",
    name: "EvalGuard — LLM Evaluation Suite & Decision Logger",
    tagline: "Catch bad model outputs before your users do.",
    industry: "AI Compliance",
    problem:
      "Teams ship LLM features with no systematic way to catch regressions, hallucinations, or unsafe outputs — and when an AI system makes a decision, they can't explain or defend it to auditors.",
    marketFit:
      "Teams shipping LLM features who need release gates and defensible decision records.",
    solution:
      "An evaluation harness that scores model outputs against a test set for accuracy, safety, and format, gating releases — paired with a logging layer that records each AI decision, its inputs, and its rationale in an audit-ready, human-readable form.",
    tech: ["LLM evaluation", "Observability", "Python"],
    status: "in-development",
  },
  {
    slug: "policycheck-ai",
    name: "PolicyCheck AI — Document Compliance Reviewer",
    tagline: "Check a document against the rules before it goes out.",
    industry: "AI Compliance",
    problem:
      "Teams must check contracts, marketing, and policies against regulations and internal rules — slow, manual, and risky to get wrong.",
    marketFit:
      "Legal, compliance, and marketing teams reviewing documents against a rule set.",
    solution:
      "A reviewer that checks a document against a rule set — GDPR, internal policy, industry regulation — flags violations by severity, and suggests fixes with citations.",
    tech: ["Document AI", "RAG", "Rules engine"],
    status: "in-development",
  },

  // AI in Cybersecurity
  {
    slug: "alerttriage-ai",
    name: "AlertTriage AI — SOC Alert Summarizer",
    tagline: "Cut through alert fatigue.",
    industry: "AI in Cybersecurity",
    problem:
      "Security analysts are buried in alerts, and alert fatigue causes real threats to be missed.",
    marketFit:
      "Security operations teams triaging high volumes of alerts manually.",
    solution:
      "A tool that clusters and summarizes security alerts, prioritizes by likely severity, and drafts an investigation starting point.",
    tech: ["Log / alert clustering", "LLM summarization", "Python"],
    status: "in-development",
  },
];
