import { site } from "@/lib/site";

export function ContactButton({ className }: { className?: string }) {
  return (
    <a
      href={`mailto:${site.email}`}
      // The primary CTA is where the brand gradient earns a solid fill:
      // sage running into amber, with near-black walnut ink on top.
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3 font-mono text-xs font-medium tracking-wide text-[#100D0A] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className ?? ""}`}
      style={{ backgroundImage: "var(--grad-brand)" }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(105deg, var(--accent-warm) 0%, var(--accent-soft) 54%, var(--accent) 100%)",
        }}
      />
      <span className="relative">Contact Me</span>
    </a>
  );
}
