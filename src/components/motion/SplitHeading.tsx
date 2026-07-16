"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * Word-by-word reveal for a heading. Nested inline markup (e.g. an accent
 * `<span>`) is preserved — SplitText slices recursively and keeps it on the
 * right words. SplitText keeps the real sentence as an aria-label on the
 * heading itself (aria: "auto", its default) and marks the split word/line
 * spans aria-hidden, so screen readers get the plain text regardless of
 * animation state.
 */
export function SplitHeading({
  as: Tag = "h2",
  children,
  className,
  trigger = "scroll",
}: {
  as?: "h1" | "h2";
  children: React.ReactNode;
  className?: string;
  /** "scroll" reveals on viewport entry; "mount" reveals immediately (hero). */
  trigger?: "scroll" | "mount";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const split = SplitText.create(el, { type: "words,lines", mask: "lines" });

      gsap.from(split.words, {
        yPercent: 110,
        opacity: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: "power3.out",
        delay: trigger === "mount" ? 0.1 : 0,
        scrollTrigger:
          trigger === "scroll" ? { trigger: el, start: "top 85%", once: true } : undefined,
      });
    }, ref);

    return () => ctx.revert();
  }, [reducedMotion, trigger]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
