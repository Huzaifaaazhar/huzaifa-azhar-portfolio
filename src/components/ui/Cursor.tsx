"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * A trailing accent dot layered on top of the native cursor — never replaces
 * it, so nothing breaks if this fails to mount. Skipped under
 * prefers-reduced-motion and on touch/coarse-pointer devices.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    const setX = gsap.quickTo(dot, "x", { duration: 0.5, ease: "power3.out" });
    const setY = gsap.quickTo(dot, "y", { duration: 0.5, ease: "power3.out" });

    function onMove(e: PointerEvent) {
      setX(e.clientX);
      setY(e.clientY);
    }
    function onDown() {
      gsap.to(dot, { scale: 0.7, duration: 0.2 });
    }
    function onUp() {
      gsap.to(dot, { scale: 1, duration: 0.2 });
    }

    gsap.set(dot, { opacity: 1 });
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora-teal opacity-0 mix-blend-difference"
    />
  );
}
