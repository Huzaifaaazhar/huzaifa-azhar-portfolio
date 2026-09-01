"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { schedule } from "@/lib/scrollFx";

/**
 * Inertial smooth scrolling. This is what gives the page the weighted,
 * "heavy camera" feel those WebGL sites have — the scroll-driven
 * transforms then ride on top of it.
 *
 * Disabled entirely under prefers-reduced-motion, where the native scroll
 * is the accessible choice.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Gentle ease-out so it settles rather than sliding on forever.
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      // Touch scrolling is already inertial on phones; hijacking it there
      // fights the platform and feels worse, not better.
      syncTouch: false,
    });

    // CSS smooth scrolling conflicts with Lenis's own interpolation.
    const html = document.documentElement;
    const previousBehaviour = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    lenis.on("scroll", schedule);

    // In-page anchors must go through Lenis or they jump instantly.
    function onClick(event: MouseEvent) {
      const link = (event.target as HTMLElement)?.closest?.('a[href^="#"], a[href^="/#"]');
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const id = href.slice(href.indexOf("#") + 1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -8 });
    }
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      html.style.scrollBehavior = previousBehaviour;
    };
  }, []);

  return null;
}
