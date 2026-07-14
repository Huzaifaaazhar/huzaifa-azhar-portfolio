import { Section } from "@/components/ui/Section";

const principles = [
  {
    title: "Small, then live",
    body: "No six-month roadmaps. We pick the narrowest useful version, ship it in days against your real tools and real data, and grow it from there.",
  },
  {
    title: "One person, whole stack",
    body: "Models, backend, data, deployment — one engineer owns all of it. No hand-offs, no agency telephone game, no waiting on someone else's sprint.",
  },
  {
    title: "Watched, not abandoned",
    body: "Launch isn't the end. I monitor the system personally after it goes live, catch the weird cases, and keep tuning it while it does real work.",
  },
] as const;

export function Approach() {
  return (
    <Section
      id="approach"
      eyebrow="Approach"
      title="How I work with small businesses."
    >
      <ol className="grid gap-5 sm:grid-cols-3">
        {principles.map((p, i) => (
          <li key={p.title} className="panel p-6">
            <span
              className="font-mono text-sm text-aurora-teal"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
              {p.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-dim">
              {p.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
