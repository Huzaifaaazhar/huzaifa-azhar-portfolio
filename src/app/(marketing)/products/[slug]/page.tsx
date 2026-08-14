import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, statusLabel } from "@/data/products";
import { ProductJsonLd } from "@/components/JsonLd";
import { FadeIn } from "@/components/ui/FadeIn";
import { LiveProjectButton } from "@/components/ui/LiveProjectButton";
import { ContactButton } from "@/components/ui/ContactButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};

  return {
    title: `${product.name} — AI for ${product.industry}`,
    description: `${product.problem} ${product.solution}`.slice(0, 155),
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: "website",
      title: product.name,
      description: product.tagline,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <div className="bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-28 md:px-10">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <Link
            href="/products"
            className="font-mono text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/60 hover:text-[#D7E2EA]"
          >
            ← All products
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-8 font-mono text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/60">
            AI for {product.industry}
          </p>
          <h1
            className="hero-heading mt-2 font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)" }}
          >
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-[#D7E2EA]/70">{product.tagline}</p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-12 flex flex-col gap-10">
            <div>
              <h2 className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/60">
                Business problem
              </h2>
              <p className="leading-relaxed text-[#D7E2EA]">{product.problem}</p>
            </div>
            <div>
              <h2 className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/60">
                Who it&apos;s for
              </h2>
              <p className="leading-relaxed text-[#D7E2EA]">{product.marketFit}</p>
            </div>
            <div>
              <h2 className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/60">
                Solution
              </h2>
              <p className="leading-relaxed text-[#D7E2EA]">{product.solution}</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <ul
            className="mt-8 flex flex-wrap gap-2 border-t border-[#D7E2EA]/15 pt-8"
            aria-label="Technology"
          >
            {product.tech.map((t) => (
              <li
                key={t}
                className="rounded-full bg-[#D7E2EA]/10 px-3 py-1 font-mono text-xs uppercase tracking-wide text-[#D7E2EA]/70"
              >
                {t}
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-10">
            {product.liveUrl ? (
              <LiveProjectButton href={product.liveUrl} />
            ) : (
              <div className="flex flex-wrap items-center gap-4">
                <span className="rounded-full border-2 border-[#D7E2EA]/30 px-6 py-2.5 font-mono text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/50">
                  {statusLabel[product.status]}
                </span>
                <ContactButton />
              </div>
            )}
          </div>
        </FadeIn>
      </div>

      <ProductJsonLd product={product} />
    </div>
  );
}
