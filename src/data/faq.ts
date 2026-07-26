export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "What does an AI consultant do?",
    answer:
      "An AI consultant helps a business figure out where AI actually creates value, then designs and builds the system that captures it. That means auditing operations for real ROI opportunities, scoping a product around a specific business problem, and building and shipping it — strategy, product, and engineering, not just a model demo.",
  },
  {
    question: "How much does a custom AI product cost?",
    answer:
      "It depends on scope — a focused agent or document pipeline is a very different build than a compliance-grade evaluation suite. Every engagement starts with an AI opportunity audit that scores the use case by impact and effort, so you get a clear build-or-skip recommendation and a rough cost range before committing to a build.",
  },
  {
    question: "Can AI work with my existing CCTV, TMS, or EHR?",
    answer:
      "Usually, yes. Most of these products are built to sit on top of systems you already run — existing CCTV cameras for computer vision, your TMS for logistics data, your EHR or intake forms for healthcare workflows — rather than requiring new hardware or a platform migration.",
  },
];
