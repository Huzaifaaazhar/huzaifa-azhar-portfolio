export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  image: string | null;
  excerpt: string;
}

const FEED_URL = "https://medium.com/feed/@azharhuzaifa123";

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractTag(block: string, tag: string): string | null {
  const cdataMatch = block.match(
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`),
  );
  if (cdataMatch) return cdataMatch[1].trim();

  const plainMatch = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return plainMatch ? decodeEntities(plainMatch[1].trim()) : null;
}

function extractFirstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

function stripHtml(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

/**
 * Fetches and parses the Medium RSS feed. Medium's feed is small and
 * consistently shaped, so a targeted regex parse avoids adding an XML
 * dependency for what is effectively five known tags per <item>.
 */
export async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "Mozilla/5.0 (compatible; portfolio-site/1.0)" },
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

    return items
      .map((block): MediumPost | null => {
        const title = extractTag(block, "title");
        const link = extractTag(block, "link");
        const pubDate = extractTag(block, "pubDate");
        if (!title || !link || !pubDate) return null;

        const content = extractTag(block, "content:encoded") ?? "";
        const description = extractTag(block, "description") ?? "";

        return {
          title: decodeEntities(title),
          link: link.split("?")[0],
          pubDate,
          image: extractFirstImage(content),
          excerpt: stripHtml(description).slice(0, 180),
        };
      })
      .filter((post): post is MediumPost => post !== null);
  } catch {
    return [];
  }
}
