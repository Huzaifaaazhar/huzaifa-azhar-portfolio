/**
 * Blog data model (routes ship in Phase 6: /blog, /blog/[slug], RSS).
 * Posts will live as MDX files in content/blog with this frontmatter shape.
 */
export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. "2026-07-14". */
  date: string;
  tags: string[];
  /** Drafts are excluded from listing, sitemap and RSS. */
  draft?: boolean;
}
