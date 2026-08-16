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
    <div className="px-5 py-20 sm:px-8 sm:py-28 md:px-10">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <Link
            href="/products"
            className="font-mono text-xs font-medium uppercase tracking-widest text-[#7B928D] hover:text-[#EDF3F1]"
          >
            ← All products
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-8 font-mono text-sm font-medium uppercase tracking-widest text-[#7B928D]">
            AI for {product.industry}
          </p>
          <h1
            className="hero-heading mt-2 leading-none tracking-tight"
            style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)" }}
          >
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-[#7B928D]">{product.tagline}</p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-12 flex flex-col gap-10">
            <div>
              <h2 className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-[#7B928D]">
                Business problem
              </h2>
              <p className="leading-relaxed text-[#EDF3F1]">{product.problem}</p>
            </div>
            <div>
              <h2 className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-[#7B928D]">
                Who it&apos;s for
              </h2>
              <p className="leading-relaxed text-[#EDF3F1]">{product.marketFit}</p>
            </div>
            <div>
              <h2 className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-[#7B928D]">
                Solution
              </h2>
              <p className="leading-relaxed text-[#EDF3F1]">{product.solution}</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <ul
            className="mt-8 flex flex-wrap gap-2 border-t border-[#1A2A28] pt-8"
            aria-label="Technology"
          >
            {product.tech.map((t) => (
              <li
                key={t}
                className="rounded-full bg-[#152423] px-3 py-1 font-mono text-xs uppercase tracking-wide text-[#7B928D]"
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
                <span className="rounded-full border-2 border-[#1A2A28] px-6 py-2.5 font-mono text-sm font-medium uppercase tracking-widest text-[#4C5F5B]">
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
