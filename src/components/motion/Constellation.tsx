"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/motion";

const POINT_COUNT = 9;
const DOT_RADIUS = 1.6;

/** Deterministic PRNG seeded by a string — same seed always yields the same
 * layout, so server and client render identical markup (no hydration
 * mismatch) despite this being effectively "random". */
function seededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return function next() {
    h = Math.imul(h ^ (h >>> 15), h | 1);
    h ^= h + Math.imul(h ^ (h >>> 7), h | 61);
    return ((h ^ (h >>> 14)) >>> 0) / 4294967296;
  };
}

function buildConstellation(seed: string) {
  const rand = seededRandom(seed);
  const points = Array.from({ length: POINT_COUNT }, () => ({
    x: 6 + rand() * 88,
    y: 15 + rand() * 70,
  }));
  // Connect consecutive points plus a couple of long cross-links, enough
  // to read as a constellation without needing real graph layout logic.
  const edges: [number, number][] = [];
  for (let i = 0; i < points.length - 1; i++) edges.push([i, i + 1]);
  edges.push([0, Math.floor(points.length / 2)]);
  edges.push([1, points.length - 2]);
  return { points, edges };
}

/**
 * A small decorative constellation: points and connecting lines that draw
 * in as the element scrolls into view. Purely decorative (aria-hidden) —
 * the real testimonial text always renders separately as plain DOM text.
 * Under prefers-reduced-motion it renders fully drawn, no animation.
 */
export function Constellation({
  seed,
  className,
}: {
  seed: string;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { points, edges } = useMemo(() => buildConstellation(seed), [seed]);

  useEffect(() => {
    if (reducedMotion) return;
    const svg = svgRef.current;
    if (!svg) return;

    const lines = Array.from(svg.querySelectorAll<SVGLineElement>("[data-line]"));
    const dots = Array.from(svg.querySelectorAll<SVGCircleElement>("[data-dot]"));

    const ctx = gsap.context(() => {
      lines.forEach((line) => {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      });
      gsap.set(dots, { attr: { r: 0 }, opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: { trigger: svg, start: "top 85%", once: true },
        })
        .to(dots, {
          attr: { r: DOT_RADIUS },
          opacity: 1,
          duration: 0.35,
          stagger: 0.05,
          ease: "back.out(2)",
        })
        .to(
          lines,
          { strokeDashoffset: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" },
          "-=0.2",
        );
    }, svg);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          data-line
          x1={points[a].x}
          y1={points[a].y}
          x2={points[b].x}
          y2={points[b].y}
          stroke="currentColor"
          strokeWidth="0.5"
          strokeOpacity="0.6"
        />
      ))}
      {points.map((p, i) => (
        <circle key={i} data-dot cx={p.x} cy={p.y} r={DOT_RADIUS} fill="currentColor" />
      ))}
    </svg>
  );
}
