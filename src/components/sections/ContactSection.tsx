import { site } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/form/ContactForm";
import { KarachiClock } from "@/components/ui/KarachiClock";

export function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Tell me what's eating your team's hours."
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
        <ContactForm />
        <aside className="space-y-6 text-sm">
          <div>
            <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
              Direct
            </h3>
            <a
              href={`mailto:${site.email}`}
              className="text-aurora-teal underline underline-offset-4"
            >
              {site.email}
            </a>
          </div>
          <div>
            <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
              Elsewhere
            </h3>
            <ul className="space-y-1.5 text-ink-dim">
              <li>
                <a
                  className="transition-colors hover:text-ink"
                  href={site.socials.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  className="transition-colors hover:text-ink"
                  href={site.socials.github}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  className="transition-colors hover:text-ink"
                  href={site.socials.medium}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Medium ↗
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
              Karachi, right now
            </h3>
            <p className="text-ink-dim">
              <KarachiClock />
            </p>
            <p className="mt-1 text-ink-faint">
              {site.location} — {site.hours}. I reply within one business day.
            </p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
