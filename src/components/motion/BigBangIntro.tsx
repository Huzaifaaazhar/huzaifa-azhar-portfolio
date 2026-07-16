"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap";

const SEEN_KEY = "huzaifa-portfolio:seen-bigbang-intro";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  try {
    if (sessionStorage.getItem(SEEN_KEY) === "1") return false;
  } catch {
    // Storage blocked (private browsing, etc.) — play once per visit
    // instead of once per session.
  }
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * A calm entrance: a solid cover fades away to reveal the page — the
 * starfield and hero are already animating in underneath by the time it
 * clears. Plays once per browser session, never under
 * prefers-reduced-motion.
 *
 * `useSyncExternalStore` with a `false` server snapshot means the server
 * and the client's first (hydration) render agree on "don't play" —
 * sessionStorage/matchMedia don't exist on the server — and React re-checks
 * the real client value right after, mounting the overlay then if it
 * should play. Getting this wrong causes a full-tree hydration mismatch
 * (an earlier, manual-effect version of this component did exactly that).
 */
export function BigBangIntro() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const shouldPlay = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (!shouldPlay) return;
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Ignore — see getSnapshot().
    }

    const overlay = overlayRef.current;
    if (!overlay) return;

    const tween = gsap.to(overlay, {
      opacity: 0,
      duration: 1.4,
      delay: 0.2,
      ease: "power2.out",
      onComplete: () => {
        overlay.style.display = "none";
      },
    });

    return () => {
      tween.kill();
    };
  }, [shouldPlay]);

  if (!shouldPlay) return null;

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-[95] bg-bg"
      aria-hidden="true"
    />
  );
}
