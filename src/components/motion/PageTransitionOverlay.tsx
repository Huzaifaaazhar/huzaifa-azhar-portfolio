"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/motion";
import { registerPageTransition } from "./pageTransitionController";

/**
 * Two transitions, one controller: normally an aurora-wipe circle scaling
 * in from the click point to cover the viewport, then back out on the new
 * route. Under prefers-reduced-motion, a plain opacity fade instead — no
 * position or scale change. Mounted once in the root layout so it persists
 * across client navigations.
 */
export function PageTransitionOverlay() {
  const circleRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const circle = circleRef.current;
    const fade = fadeRef.current;
    if (!circle || !fade) return;

    if (reducedMotion) {
      registerPageTransition({
        cover() {
          return new Promise((resolve) => {
            gsap.to(fade, {
              opacity: 1,
              duration: 0.2,
              ease: "power1.out",
              onComplete: () => resolve(),
            });
          });
        },
        reveal() {
          return new Promise((resolve) => {
            gsap.to(fade, {
              opacity: 0,
              duration: 0.2,
              ease: "power1.out",
              onComplete: () => resolve(),
            });
          });
        },
      });
      return;
    }

    registerPageTransition({
      cover(x, y) {
        return new Promise((resolve) => {
          gsap.set(circle, { left: x, top: y });
          gsap.to(circle, {
            scale: 1,
            duration: 0.55,
            ease: "power2.inOut",
            onComplete: () => resolve(),
          });
        });
      },
      reveal() {
        return new Promise((resolve) => {
          gsap.to(circle, {
            scale: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => resolve(),
          });
        });
      },
    });
  }, [reducedMotion]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={circleRef}
        className="absolute h-[220vmax] w-[220vmax] rounded-full"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%) scale(0)",
          background:
            "radial-gradient(circle, var(--aurora-teal) 0%, var(--aurora-blue) 45%, var(--aurora-violet) 75%, var(--bg) 100%)",
        }}
      />
      <div ref={fadeRef} className="absolute inset-0 bg-bg opacity-0" />
    </div>
  );
}
