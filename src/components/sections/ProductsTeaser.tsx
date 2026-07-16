import Link from "next/link";
import { teaserProducts, statusLabel } from "@/data/products";
import { Section } from "@/components/ui/Section";
import { TransitionLink } from "@/components/motion/TransitionLink";

export function ProductsTeaser() {
  return (
    <Section
      id="products"
      eyebrow="Products"
      title="Systems already doing the work, in production."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {teaserProducts.map((p) => (
          <TransitionLink
            key={p.slug}
            href={`/products#${p.slug}`}
            className="panel group flex flex-col gap-3 p-6 transition-colors hover:border-aurora-teal/50"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {p.name}
              </h3>
              <span className="shrink-0 rounded-full border border-aurora-green/30 bg-aurora-green/10 px-2.5 py-0.5 text-xs text-aurora-green">
                {statusLabel[p.status]}
              </span>
            </div>
            <p className="text-ink-dim">{p.tagline}</p>
            {p.metrics && (
              <ul className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-faint">
                {p.metrics.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            )}
            <span className="mt-auto pt-2 text-sm text-aurora-teal opacity-0 transition-opacity group-hover:opacity-100">
              Read the case →
            </span>
          </TransitionLink>
        ))}

        {/* The open slot — a conversion device, not a product. */}
        <Link
          href="/#contact"
          className="group flex flex-col justify-between gap-3 rounded-xl border border-dashed border-aurora-violet/40 bg-aurora-violet/5 p-6 transition-colors hover:border-aurora-violet"
        >
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight">
              Your project — this spot is open.
            </h3>
            <p className="mt-3 text-ink-dim">
              Tell me what’s eating your team’s hours and I’ll tell you what an
              AI system could take off their plate.
            </p>
          </div>
          <span className="text-sm text-aurora-violet">
            Send me a message →
          </span>
        </Link>
      </div>

      <div className="mt-10">
        <TransitionLink
          href="/products"
          className="inline-flex items-center gap-2 rounded-full border border-aurora-teal/40 bg-aurora-teal/10 px-6 py-3 font-medium transition-colors hover:border-aurora-teal hover:bg-aurora-teal/20"
        >
          View all products <span aria-hidden="true">→</span>
        </TransitionLink>
      </div>
    </Section>
  );
}
