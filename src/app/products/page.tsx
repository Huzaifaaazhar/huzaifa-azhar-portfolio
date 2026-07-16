import type { Metadata } from "next";
import Link from "next/link";
import { products, statusLabel, type Product } from "@/data/products";
import { ProductsJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Products",
  description: `AI systems built by ${site.name}: document intelligence, RAG support agents, shipment risk analysis, voice assistants — each one a structured case with the problem, the fit and the build.`,
  alternates: { canonical: "/products" },
};

function CaseBlock({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-aurora-teal">
        {label}
      </h3>
      <p className="leading-relaxed text-ink-dim">{children}</p>
    </div>
  );
}

function ProductCase({ product }: { product: Product }) {
  return (
    <article
      id={product.slug}
      className="panel scroll-mt-24 p-7 sm:p-10"
      aria-labelledby={`${product.slug}-title`}
    >
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2
            id={`${product.slug}-title`}
            className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {product.name}
          </h2>
          <p className="mt-2 text-lg text-ink-dim">{product.tagline}</p>
        </div>
        <span className="shrink-0 rounded-full border border-aurora-green/30 bg-aurora-green/10 px-3 py-1 text-xs text-aurora-green">
          {statusLabel[product.status]}
        </span>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        <CaseBlock label="Problem">{product.problem}</CaseBlock>
        <CaseBlock label="Who it's for">{product.marketFit}</CaseBlock>
        <CaseBlock label="What it does">{product.solution}</CaseBlock>
      </div>

      {product.metrics && (
        <ul className="mt-8 flex flex-wrap gap-3">
          {product.metrics.map((m) => (
            <li
              key={m}
              className="rounded-full border border-line bg-bg-3/60 px-4 py-1.5 text-sm text-ink"
            >
              {m}
            </li>
          ))}
        </ul>
      )}

      <footer className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <ul className="flex flex-wrap gap-2" aria-label="Technology">
          {product.tech.map((t) => (
            <li
              key={t}
              className="rounded bg-bg-3/80 px-2.5 py-1 font-mono text-xs text-ink-dim"
            >
              {t}
            </li>
          ))}
        </ul>
        {product.liveUrl ? (
          <a
            href={product.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-aurora-green px-5 py-2 text-sm font-medium text-bg transition-transform hover:scale-[1.03]"
          >
            Use it ↗
          </a>
        ) : product.status === "in-development" ? (
          <span className="text-sm text-ink-faint">
            Public release coming — ask me about early access.
          </span>
        ) : (
          <span className="text-sm text-ink-faint">
            Running privately inside a business.
          </span>
        )}
      </footer>
    </article>
  );
}

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal y={12}>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-aurora-green">
          Products
        </p>
      </Reveal>
      <SplitHeading
        as="h1"
        trigger="mount"
        className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
      >
        Built, shipped, and doing real work.
      </SplitHeading>
      <Reveal y={16} delay={0.2}>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-dim">
          Each of these is a real system — the problem it kills, who it’s for,
          and how it works. If one of them sounds like your problem, the next
          one can be yours.
        </p>
      </Reveal>

      <div className="mt-14 space-y-8">
        {products.map((p) => (
          <ProductCase key={p.slug} product={p} />
        ))}

        {/* Open slot — /products ends on the conversion path. */}
        <div className="rounded-xl border border-dashed border-aurora-violet/40 bg-aurora-violet/5 p-7 sm:p-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Your project — this spot is open.
          </h2>
          <p className="mt-3 max-w-2xl text-ink-dim">
            Describe the process that eats your team’s hours. I’ll reply within
            a business day with what an AI system could take off their plate.
          </p>
          <Link
            href="/#contact"
            className="mt-6 inline-block rounded-full bg-aurora-green px-6 py-3 font-medium text-bg transition-transform hover:scale-[1.03]"
          >
            Start a project
          </Link>
        </div>
      </div>

      <ProductsJsonLd />
    </div>
  );
}
