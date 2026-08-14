import Link from "next/link";
import { nav } from "@/lib/site";

export function Nav({
  className,
  spread = true,
}: {
  className?: string;
  /** Distribute links edge-to-edge (hero navbar) vs. compact with a gap (site header). */
  spread?: boolean;
}) {
  return (
    <nav
      aria-label="Main"
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 font-mono uppercase tracking-wider text-[#D7E2EA] ${spread ? "justify-between" : "gap-6 sm:gap-8"} ${className ?? ""}`}
    >
      {nav.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="text-xs font-medium transition-opacity duration-200 hover:opacity-70 sm:text-sm md:text-base lg:text-lg"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
