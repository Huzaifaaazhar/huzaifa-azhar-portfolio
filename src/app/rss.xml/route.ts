import { Feed } from "feed";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export async function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: `${site.name} — Writing`,
    description: site.description,
    id: site.url,
    link: site.url,
    language: "en",
    copyright: `${new Date().getUTCFullYear()} ${site.name}`,
    feedLinks: { rss: `${site.url}/rss.xml` },
    author: { name: site.name, email: site.email, link: site.url },
  });

  for (const post of posts) {
    const url = `${site.url}/blog/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      date: new Date(`${post.date}T00:00:00Z`),
      category: post.tags.map((tag) => ({ name: tag })),
    });
  }

  return new Response(feed.rss2(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
