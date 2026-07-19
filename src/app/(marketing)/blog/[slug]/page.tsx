import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { FadeIn } from "@/components/ui/FadeIn";
import { BlogPostingJsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
      <FadeIn y={12}>
        <Link
          href="/blog"
          className="font-mono text-xs uppercase tracking-[0.25em] text-aurora-green"
        >
          ← Writing
        </Link>
      </FadeIn>
      <FadeIn
        as="h1"
        delay={0.1}
        className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
      >
        {post.title}
      </FadeIn>
      <FadeIn y={16} delay={0.2}>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
          {formatDate(post.date)}
        </p>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="prose prose-aurora mt-10 max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </FadeIn>

      <BlogPostingJsonLd post={post} />
    </article>
  );
}
