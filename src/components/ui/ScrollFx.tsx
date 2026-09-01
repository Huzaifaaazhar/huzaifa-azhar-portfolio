"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { register, remeasure, type FxConfig } from "@/lib/scrollFx";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Wraps children in a scroll-driven transform. Purely decorative: it only
 * ever sets a transform, never opacity or visibility, so nothing here can
 * leave content unreadable if it fails.
 */
export function ScrollFx({
  children,
  className,
  perspective,
  ...cfg
}: FxConfig & {
  children: ReactNode;
  className?: string;
  /** Adds a perspective ancestor so rotateX/rotateY read as real depth. */
  perspective?: number;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = inner.current;
    if (!el || reduced()) return;
    const unregister = register(el, cfg);

    // Images settling changes offsets, so re-measure once they're in.
    const imgs = Array.from(el.querySelectorAll("img")).filter((i) => !i.complete);
    let left = imgs.length;
    const done = () => {
      if (--left <= 0) remeasure();
    };
    imgs.forEach((i) => {
      i.addEventListener("load", done, { once: true });
      i.addEventListener("error", done, { once: true });
    });
    const settle = window.setTimeout(remeasure, 1200);

    return () => {
      unregister();
      window.clearTimeout(settle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={outer}
      className={className}
      style={perspective ? { perspective: `${perspective}px` } : undefined}
    >
      <div ref={inner} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}
