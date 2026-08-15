"use client";

import { useEffect, useRef } from "react";

/**
 * Character-by-character scroll-reveal text.
 *
 * Every character's opacity is derived in CSS from two custom properties —
 * `--p` (scroll progress) on the paragraph and a static `--i` (index) per
 * character. That keeps the whole effect to a single style write per frame
 * instead of one scroll-linked animation value per character.
 */
export function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const chars = Array.from(text);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    function update() {
      frame = 0;
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      // Runs from just below the fold to just above it, matching the
      // previous "start 0.8" → "end 0.2" scroll offsets.
      const start = window.innerHeight * 0.8;
      const end = window.innerHeight * 0.2;
      const progress = (start - rect.top) / (start - end + rect.height);

      node.style.setProperty("--p", String(Math.min(1, Math.max(0, progress))));
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <p
      ref={ref}
      className={className}
      style={{ "--n": chars.length } as React.CSSProperties}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className="animated-char"
          style={{ "--i": i } as React.CSSProperties}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </p>
  );
}
