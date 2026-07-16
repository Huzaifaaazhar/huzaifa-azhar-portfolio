import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Writing",
  description: `Notes on AI systems, automation and shipping for small businesses — from ${site.name}.`,
  alternates: { canonical: "/blog" },
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal y={12}>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-aurora-green">
          Writing
        </p>
      </Reveal>
      <SplitHeading
        as="h1"
        trigger="mount"
        className="max-w-2xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
      >
        Notes from building AI systems.
      </SplitHeading>

      {posts.length === 0 ? (
        <Reveal y={16} delay={0.2}>
          <p className="mt-10 text-ink-dim">
            Nothing published yet — check back soon.
          </p>
        </Reveal>
      ) : (
        <Reveal delay={0.2}>
          <ul className="mt-14 space-y-6">
            {posts.map((post) => (
              <li key={post.slug} className="panel p-6 sm:p-8">
                <Link href={`/blog/${post.slug}`} className="group">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                    {formatDate(post.date)}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-semibold tracking-tight group-hover:text-aurora-teal sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-ink-dim">{post.description}</p>
                  {post.tags.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
                      {post.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded bg-bg-3/80 px-2.5 py-1 font-mono text-xs text-ink-dim"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </div>
  );
}
