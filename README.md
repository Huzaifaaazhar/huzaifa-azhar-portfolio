# huzaifaazhar — portfolio

Personal site for **Huzaifa Azhar, AI Engineer** (Karachi, Pakistan). Built to
convert small-business visitors into contact-form leads, with a signature
"big-bang → galaxy" WebGL experience layered on top.

**Stack:** Next.js (App Router) · TypeScript · Tailwind v4 · Zod ·
(later phases) Prisma + Neon Postgres · Resend · React Three Fiber · GSAP + Lenis

## Build phases

| Phase | Scope | Status |
| --- | --- | --- |
| 1 | Content shell, all sections, `/products`, full SEO | ✅ done |
| 2 | Contact form → Neon DB + Resend emails | ⬜ |
| 3 | Motion layer (Lenis, GSAP, split reveals, cursor) | ⬜ |
| 4 | Living galaxy WebGL background | ⬜ |
| 5 | Big-bang intro + animated `/products` transition | ⬜ |
| 6 | Testimonials signature animation + blog (MDX, RSS) | ⬜ |

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
2. Copy the **pooled** connection string from **Connect** into `DATABASE_URL`.
3. After Phase 2 lands: `npx prisma migrate deploy` runs against it.

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
src/app/               routes: / , /products , sitemap, robots, OG image
src/components/        sections/ (page sections) · form/ · ui/ · JsonLd
src/data/              products.ts, testimonials.ts — typed content, no CMS
src/lib/               site.ts (identity/config) · contact.ts (Zod schema) · blog.ts
content/blog/          MDX posts (Phase 6)
src/app/globals.css    aurora design tokens — edit colors here
```

- **Edit copy/links:** `src/lib/site.ts` and `src/data/*.ts`.
- **Edit colors:** the `:root` block in `src/app/globals.css`.
- **WebGL (Phases 4–5)** will be isolated under `src/components/scene/` and
  mounts into the fixed `.aurora-backdrop` layer, so content and spectacle
  never touch.

## Accessibility & performance ground rules

- All meaningful content is server-rendered real DOM text; the hero `<h1>` is
  the LCP element. WebGL is decorative (`aria-hidden`) and lazy-mounted.
- `prefers-reduced-motion` gets a static aurora-gradient experience.
- The contact form degrades gracefully: if the API is unreachable it opens a
  pre-filled `mailto:` so a lead is never dropped.
