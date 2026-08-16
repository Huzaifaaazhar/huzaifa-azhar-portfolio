export function LiveProjectButton({
  href,
  className,
}: {
  href?: string;
  className?: string;
}) {
  const classes = `inline-flex items-center justify-center rounded-full border border-[#1A2A28] px-8 py-3 font-mono text-sm font-medium uppercase tracking-widest text-[#82CFC0] transition-colors hover:bg-[#152423] sm:px-10 sm:py-3.5 sm:text-base ${className ?? ""}`;

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
