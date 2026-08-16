import { site } from "@/lib/site";

export function ContactButton({ className }: { className?: string }) {
  return (
    <a
      href={`mailto:${site.email}`}
      // The one place a solid accent fill is earned: the primary CTA. Dark
      // ink on teal keeps the contrast high without going neon.
      className={`inline-flex items-center justify-center rounded-full bg-[#82CFC0] px-8 py-3 font-mono text-xs font-medium tracking-wide text-[#07090A] transition-colors duration-200 hover:bg-[#9BDCCF] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className ?? ""}`}
    >
      Contact Me
    </a>
  );
}
