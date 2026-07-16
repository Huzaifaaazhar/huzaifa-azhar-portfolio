import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

/**
 * Blog data model. Posts live as MDX files in content/blog with this
 * frontmatter shape (see content/blog/README.md). `draft: true` posts are
 * excluded everywhere — listing, sitemap, RSS — regardless of environment.
 */
export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. "2026-07-14". */
  date: string;
  tags: string[];
  draft?: boolean;
}

const frontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

export interface Post extends PostMeta {
  /** Raw MDX body (frontmatter stripped), ready for MDXRemote. */
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function readPostFile(filename: string): Post {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in content/blog/${filename}: ${parsed.error.message}`,
    );
  }

  return { slug, content, ...parsed.data };
}

function listPostFilenames(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
}

/** All published posts, newest first. Drafts are never included. */
export function getAllPosts(): Post[] {
  return listPostFilenames()
    .map(readPostFile)
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const filename = `${slug}.mdx`;
  if (!listPostFilenames().includes(filename)) return null;
  const post = readPostFile(filename);
  return post.draft ? null : post;
}
