export function LiveProjectButton({
  href,
  className,
}: {
  href?: string;
  className?: string;
}) {
  const classes = `inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base ${className ?? ""}`;

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={classes}
      >
        Live Project
      </a>
    );
  }

  return <button type="button" className={classes}>Live Project</button>;
}
