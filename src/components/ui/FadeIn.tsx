"use client";

import { useEffect, useRef, useState } from "react";

const EASE = "cubic-bezier(0.25, 0.1, 0.25, 1)";

/**
 * Reveals its children once they scroll into view.
 *
 * Content must never get stuck hidden, so this leans on three fallbacks:
 * a generous rootMargin, a timeout that reveals regardless if the observer
 * never fires, and a `fade-in` class that `<noscript>` forces visible.
 */
type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "h1";
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
};

export function FadeIn({
  children,
  className,
  as = "div",
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement & HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(() => setIsVisible(true), 0);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0 },
    );
    observer.observe(el);

    // Anything already on screen at mount should reveal immediately, and
    // a missed observer callback must never leave the section blank.
    const failsafe = window.setTimeout(() => {
      setIsVisible(true);
      observer.disconnect();
    }, 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "none" : `translate3d(${x}px, ${y}px, 0)`,
    transition: `opacity ${duration}s ${EASE} ${delay}s, transform ${duration}s ${EASE} ${delay}s`,
    willChange: isVisible ? undefined : "opacity, transform",
  };

  const merged = className ? `fade-in ${className}` : "fade-in";

  if (as === "h1") {
    return (
      <h1 ref={ref} className={merged} style={style}>
        {children}
      </h1>
    );
  }

  return (
    <div ref={ref} className={merged} style={style}>
      {children}
    </div>
  );
}
