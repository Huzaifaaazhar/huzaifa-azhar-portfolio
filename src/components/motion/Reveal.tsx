"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * Fades and slides its children up as they enter the viewport. Under
 * prefers-reduced-motion the effect never runs, so children render in their
 * normal static state from the first paint — no flash, no JS dependency.
 */
export function Reveal({
  children,
  className,
  y = 24,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [reducedMotion, y, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
