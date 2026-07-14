import Link from "next/link";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto flex max-w-6xl flex-col justify-center px-5 pt-24 pb-20 sm:px-8 sm:pt-36 sm:pb-28 min-h-[70svh]">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-aurora-green">
          {site.name} · {site.role} · {site.location}
        </p>
        {/* The h1 is real DOM text on purpose — it is the LCP element and what
            crawlers read. The cosmos stays decorative behind it. */}
        <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
          I build <span className="aurora-text">AI systems</span> that do real
          work.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-dim sm:text-xl">
          {site.description}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/#contact"
            className="rounded-full bg-aurora-green px-6 py-3 font-medium text-bg transition-transform hover:scale-[1.03]"
          >
            Start a project
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="rounded-full border border-line px-6 py-3 font-medium text-ink-dim transition-colors hover:border-aurora-teal/60 hover:text-ink"
          >
            Email me
          </a>
        </div>
      </div>
    </section>
  );
}
