"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * Drives Lenis off GSAP's ticker so ScrollTrigger-based reveals stay in
 * sync with the smoothed scroll position. Renders nothing; under
 * prefers-reduced-motion it never initializes, leaving native scrolling.
 */
export function SmoothScroll() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({ autoRaf: false, anchors: true });
    const offScroll = lenis.on("scroll", ScrollTrigger.update);

    function onTick(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      offScroll();
      lenis.destroy();
    };
  }, [reducedMotion]);

  return null;
}
