"use client";

import { useEffect, useMemo, useRef } from "react";

/**
 * Character-by-character scroll-reveal text.
 *
 * Every character's opacity is derived in CSS from two custom properties —
 * `--p` (scroll progress) on the paragraph and a static `--i` (index) per
 * character. That keeps the whole effect to a single style write per frame
 * instead of one scroll-linked animation value per character.
 *
 * Characters are grouped into inline-block words so the paragraph still
 * wraps on spaces; per-character spans on their own would give the line no
 * break opportunities and run off the side of the screen.
 */
export function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  const { words, total } = useMemo(() => {
    let index = 0;
    const words = text
      .split(" ")
      .map((word) => Array.from(word).map((char) => ({ char, index: index++ })));
    return { words, total: index };
  }, [text]);

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
      style={{ "--n": total } as React.CSSProperties}
    >
      {words.map((chars, wordIndex) => (
        <span key={wordIndex}>
          <span className="inline-block">
            {chars.map(({ char, index }) => (
              <span
                key={index}
                className="animated-char"
                style={{ "--i": index } as React.CSSProperties}
              >
                {char}
              </span>
            ))}
          </span>
          {wordIndex < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
