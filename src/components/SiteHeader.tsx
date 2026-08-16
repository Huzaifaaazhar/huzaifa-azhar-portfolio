import Link from "next/link";
import { site } from "@/lib/site";
import { Nav } from "@/components/ui/Nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          className="font-[family-name:var(--font-script)] text-2xl text-[#82CFC0]"
        >
          {site.name}
        </Link>
        <Nav spread={false} />
      </div>
    </header>
  );
}
