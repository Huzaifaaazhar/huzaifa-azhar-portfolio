import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Blog posts join this list in Phase 6.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/products`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
