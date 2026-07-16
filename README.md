# huzaifaazhar — portfolio

Personal site for **Huzaifa Azhar, AI Engineer** (Karachi, Pakistan). Built to
convert small-business visitors into contact-form leads, with a signature
"big-bang → galaxy" WebGL experience layered on top.

**Stack:** Next.js (App Router) · TypeScript · Tailwind v4 · Zod ·
Prisma + Neon Postgres · Resend · React Three Fiber · GSAP + Lenis · MDX

## Build phases

| Phase | Scope | Status |
| --- | --- | --- |
| 1 | Content shell, all sections, `/products`, full SEO | ✅ done |
| 2 | Contact form → Neon DB + Resend emails | 🟡 code done — needs real Neon/Resend credentials (see below) |
| 3 | Motion layer (Lenis, GSAP, split reveals, cursor) | ✅ done |
| 4 | Living galaxy WebGL background | ✅ done |
| 5 | Big-bang intro + animated `/products` transition | ✅ done |
| 6 | Testimonials signature animation + blog (MDX, RSS) | ✅ done |

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in values (see below)
npm run dev                  # http://localhost:3000
```

`npm run build && npm start` for a production build. `npm run lint` for ESLint.

## Environment variables

All keys live in `.env.local` (never committed). See [`.env.example`](.env.example)
for the full annotated list. Until Phase 2 ships, only `NEXT_PUBLIC_SITE_URL`
does anything.

## First-time service setup (fresh accounts)

### 1. Vercel (hosting)

1. Create an account at [vercel.com](https://vercel.com) (sign in with GitHub).
2. Push this repo to GitHub, then **Add New → Project** and import it.
   Vercel auto-detects Next.js; no build settings needed.
3. Under **Project → Settings → Environment Variables**, add every key from
   `.env.example` (Production + Preview).
4. Every push to `main` deploys automatically.

### 2. Neon (Postgres, Phase 2)

1. Create an account at [neon.tech](https://neon.tech) → **New Project**
   (pick a region near Vercel's, e.g. US East).
2. Copy the **pooled** connection string from **Connect** into `DATABASE_URL`
   (in `.env.local`, and in Vercel's env vars for Production/Preview).
3. Create the `Lead` table: `npx prisma migrate dev --name init` (first time,
   local) or `npx prisma migrate deploy` (CI/Vercel, no prompts).

### 3. Resend (transactional email, Phase 2)

1. Create an account at [resend.com](https://resend.com).
2. **API Keys → Create** → put the key in `RESEND_API_KEY`.
3. Verify your domain (required for real sending — see next section).

## Domain & email deliverability (do before launch)

There is **no domain yet** — the site builds against the
`NEXT_PUBLIC_SITE_URL` placeholder. Before launch:

1. Buy the domain (e.g. `huzaifaazhar.com`) at any registrar.
2. Add it to the Vercel project (**Settings → Domains**) and follow the DNS
   instructions.
3. In Resend, **Domains → Add Domain**, then add the DNS records it gives you
   (SPF + DKIM, and enable DMARC). Until this is done Resend only sends from
   `onboarding@resend.dev` **to your own inbox** — lead auto-replies won't work.
4. Update `NEXT_PUBLIC_SITE_URL` and `CONTACT_FROM_EMAIL` everywhere
   (`.env.local` + Vercel env vars) and redeploy.

## Viewing stored leads (Phase 2)

Leads are stored in Neon before any email is sent, so nothing is lost if email
fails. Two ways to read them:

- `npx prisma studio` — local UI over the production `DATABASE_URL`.
- Neon console → **Tables** → `Lead`.

Every lead notification also lands at `CONTACT_TO_EMAIL`.

## Where things live

```
src/app/               routes: / , /products , /blog , /blog/[slug] , /api/contact ,
                       /rss.xml , sitemap, robots, OG image
src/components/        sections/ (page sections) · form/ · ui/ · JsonLd
src/data/              products.ts, testimonials.ts — typed content, no CMS
src/lib/               site.ts (identity/config) · contact.ts (Zod schema) · blog.ts · prisma.ts
src/generated/prisma/  generated Prisma Client — gitignored, rebuilt by `postinstall`
prisma/schema.prisma   Lead model (Postgres via Neon)
content/blog/          MDX posts — frontmatter contract in content/blog/README.md
src/app/globals.css    aurora design tokens — edit colors here; also themes
                       @tailwindcss/typography's `prose` for MDX content
src/components/scene/  Galaxy — WebGL background (Three.js / React Three Fiber)
src/components/motion/ SmoothScroll (Lenis+GSAP), Reveal, SplitHeading,
                       PageTransitionOverlay + TransitionLink, BigBangIntro
```

- **Edit copy/links:** `src/lib/site.ts` and `src/data/*.ts`.
- **Edit colors:** the `:root` block in `src/app/globals.css`; the galaxy's
  particle colors are set separately in `src/components/scene/Galaxy.tsx`.
- **WebGL** lives under `src/components/scene/` and mounts into the fixed
  `.aurora-backdrop` layer via `GalaxyBackdrop`, so content and spectacle
  never touch. It's lazy-loaded client-only (`next/dynamic(..., { ssr: false })`)
  and skipped entirely under `prefers-reduced-motion` or the Save-Data hint —
  the CSS aurora gradient alone is the fallback then.
- **Big-bang intro** (`BigBangIntro`, mounted on `/` only): a one-time flash
  that fades to reveal the galaxy and hero already animating in underneath.
  Plays once per browser session (`sessionStorage`), never under
  `prefers-reduced-motion`.
- **`/products` page transition** (`TransitionLink` + `PageTransitionOverlay`,
  the latter mounted once in the root layout so it survives client
  navigations): a circle scales in from the click point to cover the
  viewport, `router.push`es underneath, then scales back out on the new
  route. Used only on links from `/` into `/products`. Under
  `prefers-reduced-motion` it swaps to a plain opacity fade instead — no
  positional movement — rather than skipping the transition outright.
  This uses GSAP, not React's `<ViewTransition>` / Next's experimental
  `viewTransition` flag: the installed `react` (19.2.4, a fixed pin, not a
  canary tag) doesn't export `ViewTransition`, so that API isn't actually
  usable here without an unrequested React version change.
- **Blog** (`content/blog/*.mdx` → `/blog`, `/blog/[slug]`, `/rss.xml`):
  frontmatter is Zod-validated in `src/lib/blog.ts`. `draft: true` posts are
  excluded everywhere — listing, sitemap, RSS, and the homepage "Writing"
  teaser (which renders nothing while there are zero published posts).
  `content/blog/example-post.mdx` ships as a draft proving the pipeline
  works end to end — delete it once there's a real first post.
- **Testimonials** (`Constellation`, `src/data/testimonials.ts`): each
  testimonial gets a small decorative star-cluster (seeded deterministically
  from its `id`, so server/client markup always matches) whose points and
  connecting lines draw in via GSAP as it scrolls into view; the quote text
  itself is always plain DOM text, unaffected by the animation. Renders
  nothing on the homepage while every testimonial is still a placeholder —
  same policy as Writing. Under `prefers-reduced-motion` the constellation
  renders fully drawn, no animation.

## Accessibility & performance ground rules

- All meaningful content is server-rendered real DOM text; the hero `<h1>` is
  the LCP element. WebGL is decorative (`aria-hidden`) and lazy-mounted.
- `prefers-reduced-motion` gets a static aurora-gradient experience.
- The contact form degrades gracefully: if the API is unreachable it opens a
  pre-filled `mailto:` so a lead is never dropped.
