import Link from "next/link";
import { nav, site } from "@/lib/site";
import { liveTestimonials } from "@/data/testimonials";

export function SiteHeader() {
  // The Testimonials nav link points to a same-page anchor that only
  // exists once there's at least one real testimonial — same policy as
  // the section itself, which renders nothing until then.
  const items = nav.filter(
    (item) => item.href !== "/#testimonials" || liveTestimonials.length > 0,
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-base font-semibold tracking-tight"
        >
          {site.name}
          <span className="ml-2 hidden text-ink-faint sm:inline">
            · {site.role}
          </span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-5 text-sm sm:gap-7">
            {items.map((item) => (
              <li key={item.href} className="hidden sm:block">
                <Link
                  href={item.href}
                  className="text-ink-dim transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#contact"
                className="rounded-full border border-aurora-teal/40 bg-aurora-teal/10 px-4 py-1.5 font-medium text-ink transition-colors hover:border-aurora-teal hover:bg-aurora-teal/20"
              >
                Start a project
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
