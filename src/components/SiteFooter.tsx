import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-ink-dim sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a
              className="transition-colors hover:text-ink"
              href={`mailto:${site.email}`}
            >
              Email
            </a>
          </li>
          <li>
            <a
              className="transition-colors hover:text-ink"
              href={site.socials.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              className="transition-colors hover:text-ink"
              href={site.socials.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              className="transition-colors hover:text-ink"
              href={site.socials.medium}
              rel="noopener noreferrer"
              target="_blank"
            >
              Medium
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
