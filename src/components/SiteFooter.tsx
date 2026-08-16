import { Mail } from "lucide-react";
import { site } from "@/lib/site";
import { GithubIcon, LinkedinIcon, MediumIcon, KaggleIcon } from "@/components/ui/icons";

const LINKS = [
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail, external: false },
  { label: "GitHub", href: site.socials.github, Icon: GithubIcon, external: true },
  { label: "Kaggle", href: site.socials.kaggle, Icon: KaggleIcon, external: true },
  { label: "Medium", href: site.socials.medium, Icon: MediumIcon, external: true },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedinIcon, external: true },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-[#1A2A28] px-5 py-10 sm:px-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-sm text-[#4C5F5B]">
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {LINKS.map(({ label, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-2 font-mono text-sm text-[#7B928D] transition-colors hover:text-[#82CFC0]"
              >
                <Icon className="h-[18px] w-[18px]" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
