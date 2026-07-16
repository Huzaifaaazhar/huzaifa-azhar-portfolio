import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Section } from "@/components/ui/Section";

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Recent-posts teaser. Renders nothing until there's at least one post. */
export function Writing() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <Section
      id="writing"
      eyebrow="Writing"
      title="Notes on building AI systems that ship."
    >
      <div className="grid gap-5 sm:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="panel group flex flex-col gap-3 p-6 transition-colors hover:border-aurora-teal/50"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
              {formatDate(post.date)}
            </p>
            <h3 className="font-display text-lg font-semibold tracking-tight group-hover:text-aurora-teal">
              {post.title}
            </h3>
            <p className="text-sm text-ink-dim">{post.description}</p>
            <span className="mt-auto pt-2 text-sm text-aurora-teal opacity-0 transition-opacity group-hover:opacity-100">
              Read →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-aurora-teal/40 bg-aurora-teal/10 px-6 py-3 font-medium transition-colors hover:border-aurora-teal hover:bg-aurora-teal/20"
        >
          Read all posts <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  );
}
