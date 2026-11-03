import type { Metadata } from "next";
import Link from "next/link";
import { products, statusLabel, type Product } from "@/data/products";
import { ProductsJsonLd } from "@/components/JsonLd";
import { FadeIn } from "@/components/ui/FadeIn";
import { LiveProjectButton } from "@/components/ui/LiveProjectButton";
import { ContactButton } from "@/components/ui/ContactButton";

export const metadata: Metadata = {
  title: "AI Products by Industry",
  description:
    "Vertical AI products across logistics, healthcare, fintech, CCTV, agriculture, IT, compliance, and cybersecurity — each with the business problem and the solution.",
  alternates: { canonical: "/products" },
};

function groupByIndustry(items: Product[]) {
  const groups: { industry: string; products: Product[] }[] = [];
  for (const product of items) {
    let group = groups.find((g) => g.industry === product.industry);
    if (!group) {
      group = { industry: product.industry, products: [] };
      groups.push(group);
    }
    group.products.push(product);
  }
  return groups;
}

function InfoBlock({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <h3 className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-[#6B5B4C]">
        {label}
      </h3>
      <p className="leading-relaxed text-[#2B2219]">{children}</p>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <FadeIn delay={index * 0.1}>
      <article
        id={product.slug}
        className="scroll-mt-24 rounded-[40px] border border-[#DED2C0] bg-[#FBF7F0] p-6 sm:rounded-[50px] sm:p-8 md:rounded-[60px] md:p-10"
        aria-labelledby={`${product.slug}-title`}
      >
        <header className="mb-8 flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span
              className="font-black text-[#2B2219]"
              style={{ fontSize: "clamp(2.5rem, 8vw, 100px)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-1">
              <h2
                id={`${product.slug}-title`}
                className="text-xl font-semibold text-[#2B2219] sm:text-2xl md:text-3xl"
              >
                <Link href={`/products/${product.slug}`} className="hover:opacity-80">
                  {product.name}
                </Link>
              </h2>
              <p className="text-[#6B5B4C]">{product.tagline}</p>
            </div>
          </div>

          {product.liveUrl ? (
            <LiveProjectButton href={product.liveUrl} />
          ) : (
            <span className="rounded-full border-2 border-[#DED2C0] px-6 py-2.5 font-mono text-sm font-medium uppercase tracking-widest text-[#9A8A79]">
              {statusLabel[product.status]}
            </span>
          )}
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <InfoBlock label="Business problem">{product.problem}</InfoBlock>
          <InfoBlock label="Solution">{product.solution}</InfoBlock>
        </div>

        {product.metrics && (
          <ul className="mt-8 flex flex-wrap gap-3">
            {product.metrics.map((m) => (
              <li
                key={m}
                className="rounded-full border border-[#DED2C0] px-4 py-1.5 font-mono text-sm text-[#2B2219]"
              >
                {m}
              </li>
            ))}
          </ul>
        )}

        <ul
          className="mt-6 flex flex-wrap gap-2 border-t border-[#DED2C0] pt-6"
          aria-label="Technology"
        >
          {product.tech.map((t) => (
            <li
              key={t}
              className="rounded-full bg-[#EFE6D8] px-3 py-1 font-mono text-xs uppercase tracking-wide text-[#6B5B4C]"
            >
              {t}
            </li>
          ))}
        </ul>
      </article>
    </FadeIn>
  );
}

export default function ProductsPage() {
  const groups = groupByIndustry(products);

  return (
    <div className="px-5 py-20 sm:px-8 sm:py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h1
            className="hero-heading text-center leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            Products
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mx-auto mt-8 max-w-2xl text-center leading-relaxed text-[#6B5B4C]">
            Vertical AI products, grouped by the industry they serve — the
            business problem each one kills, and how it works. If one of them
            sounds like your problem, the next one can be yours.
          </p>
        </FadeIn>

        <div className="mt-16 flex flex-col gap-20 sm:mt-20 md:mt-24">
          {groups.map((group) => (
            <div key={group.industry} className="flex flex-col gap-8">
              <FadeIn>
                <h2
                  className="hero-heading leading-none tracking-tight"
                  style={{ fontSize: "clamp(1.75rem, 6vw, 4rem)" }}
                >
                  AI Products for {group.industry}
                </h2>
              </FadeIn>
              <div className="flex flex-col gap-8">
                {group.products.map((p, i) => (
                  <ProductCard key={p.slug} product={p} index={i} />
                ))}
              </div>
            </div>
          ))}

          <FadeIn>
            <div className="flex flex-col items-center gap-6 rounded-[40px] border-2 border-dashed border-[#DED2C0] p-10 text-center sm:rounded-[50px] md:rounded-[60px]">
              <h2 className="text-xl font-semibold text-[#2B2219] sm:text-2xl">
                Your project — this spot is open.
              </h2>
              <p className="max-w-xl text-[#6B5B4C]">
                Describe the process that eats your team&apos;s hours.
                I&apos;ll reply within a business day with what an AI system
                could take off their plate.
              </p>
              <ContactButton />
            </div>
          </FadeIn>
        </div>
      </div>

      <ProductsJsonLd />
    </div>
  );
}
