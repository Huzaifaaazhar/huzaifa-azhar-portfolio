# Blog content

MDX posts live here (shipping in Phase 6 as `/blog` and `/blog/[slug]` with
per-post SEO, JSON-LD and RSS).

Each post is a `.mdx` file whose frontmatter matches `PostMeta` in
`src/lib/blog.ts`:

```yaml
---
title: "Post title"
description: "One-sentence summary used for SEO."
date: "2026-07-14"
tags: ["rag", "voice-agents"]
draft: true
---
```

Keep `draft: true` until a post is ready — drafts never build.
