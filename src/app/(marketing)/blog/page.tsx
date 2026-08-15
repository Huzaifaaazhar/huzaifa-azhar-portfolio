import type { Metadata } from "next";
import { getMediumPosts } from "@/lib/medium";
import { site } from "@/lib/site";
import { FadeIn } from "@/components/ui/FadeIn";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Writing",
  description: `Notes on AI systems, automation and shipping for small businesses — from ${site.name}, on Medium.`,
  alternates: { canonical: "/blog" },
};

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getMediumPosts();

  return (
    <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
      <FadeIn>
        <h1
          className="hero-heading text-center leading-none tracking-tight"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Writing
        </h1>
      </FadeIn>
      <FadeIn delay={0.15}>
        <p className="mx-auto mt-8 max-w-xl text-center leading-relaxed text-[#D7E2EA]/70">
          Notes on AI systems, automation, and shipping for small businesses —
          published on{" "}
          <a
            href={site.socials.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D7E2EA] underline underline-offset-4"
          >
            Medium
          </a>
          .
        </p>
      </FadeIn>

      {posts.length === 0 ? (
        <FadeIn delay={0.3}>
          <p className="mt-16 text-center text-[#D7E2EA]/60">
            Couldn&apos;t load articles right now — read them directly on{" "}
            <a
              href={site.socials.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D7E2EA] underline underline-offset-4"
            >
              Medium
            </a>
            .
          </p>
        </FadeIn>
      ) : (
        <div className="mt-16 grid gap-8 sm:mt-20 sm:grid-cols-2">
          {posts.map((post, i) => (
            <FadeIn key={post.link} delay={i * 0.1}>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-[30px] border-2 border-[#D7E2EA]/20 transition-colors hover:border-[#D7E2EA]"
              >
                {post.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.image}
                    alt=""
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                )}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="font-mono text-xs text-[#D7E2EA]/50">
                    {formatDate(post.pubDate)}
                  </p>
                  <h2 className="text-lg font-medium text-[#D7E2EA] group-hover:opacity-80">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-[#D7E2EA]/60">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto pt-2 font-mono text-sm text-[#D7E2EA]">
                    Read on Medium ↗
                  </span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
