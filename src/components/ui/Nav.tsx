"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { nav } from "@/lib/site";

type Rect = { x: number; y: number; w: number; h: number };

const PAD_X = 14;
const PAD_Y = 8;

/** Spring tuned soft + slightly under-damped so the pill wobbles into place. */
const GOO = { stiffness: 320, damping: 22, mass: 0.9 } as const;

export function Nav({
  className,
  spread = true,
}: {
  className?: string;
  /** Distribute links edge-to-edge (hero navbar) vs. compact with a gap (site header). */
  spread?: boolean;
}) {
  const reduce = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [active, setActive] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  const x = useSpring(0, GOO);
  const y = useSpring(0, GOO);
  const w = useSpring(0, GOO);
  const h = useSpring(0, GOO);
  const open = useSpring(0, { stiffness: 260, damping: 26 });

  // Squash-and-stretch: the faster the pill travels, the more it stretches
  // along its direction of travel and thins out across it.
  const vx = useVelocity(x);
  const openScale = useTransform(open, [0, 1], [0.55, 1]);
  const stretch = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const scaleX = useTransform(stretch, (v) => 1 + Math.min(Math.abs(v) / 2600, 0.22));
  const scaleY = useTransform(stretch, (v) => 1 - Math.min(Math.abs(v) / 4200, 0.14));

  useEffect(() => {
    if (reduce) return;
    return vx.on("change", (v) => stretch.set(v));
  }, [vx, stretch, reduce]);

  const measure = useCallback((i: number): Rect | null => {
    const el = itemRefs.current[i];
    const host = navRef.current;
    if (!el || !host) return null;
    const a = el.getBoundingClientRect();
    const b = host.getBoundingClientRect();
    return {
      x: a.left - b.left - PAD_X,
      y: a.top - b.top - PAD_Y,
      w: a.width + PAD_X * 2,
      h: a.height + PAD_Y * 2,
    };
  }, []);

  const focusItem = useCallback(
    (i: number) => {
      if (reduce) {
        setActive(i);
        return;
      }
      const r = measure(i);
      if (!r) return;
      if (!visible) {
        // First touch: land the pill in place without a flight across the bar.
        x.jump(r.x);
        y.jump(r.y);
        w.jump(r.w);
        h.jump(r.h);
        setVisible(true);
      } else {
        x.set(r.x);
        y.set(r.y);
        w.set(r.w);
        h.set(r.h);
      }
      open.set(1);
      setActive(i);
    },
    [measure, reduce, visible, x, y, w, h, open],
  );

  const clear = useCallback(() => {
    setActive(null);
    if (!reduce) open.set(0);
  }, [open, reduce]);

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      onPointerLeave={clear}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) clear();
      }}
      className={`relative flex flex-wrap items-center gap-x-5 gap-y-2 text-[#2B2219] ${spread ? "justify-between" : "gap-6 sm:gap-8"} ${className ?? ""}`}
    >
      {!reduce && (
        <>
          {/* The goo filter blurs then re-sharpens alpha, so the pill's edges
              behave like surface tension rather than a hard rounded rect. */}
          <svg aria-hidden="true" width="0" height="0" className="absolute">
            <filter id="nav-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </svg>
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 -z-0"
            style={{
              x,
              y,
              width: w,
              height: h,
              opacity: open,
              scaleX,
              scaleY,
              filter: "url(#nav-goo)",
              willChange: "transform",
            }}
          >
            <motion.span
              className="block h-full w-full rounded-full"
              style={{
                scale: openScale,
                background:
                  "radial-gradient(130% 150% at 30% 0%, rgba(232,163,61,0.42) 0%, rgba(156,175,136,0.34) 48%, rgba(107,79,58,0.22) 100%)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
              }}
            />
          </motion.span>
        </>
      )}

      {nav.map((item, i) => (
        <motion.span
          key={item.label}
          className="relative z-10 inline-flex"
          animate={
            reduce
              ? undefined
              : { scale: active === i ? 1.07 : 1, y: active === i ? -1 : 0 }
          }
          transition={{ type: "spring", stiffness: 420, damping: 18 }}
        >
          <Link
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            href={item.href}
            onPointerEnter={() => focusItem(i)}
            onFocus={() => focusItem(i)}
            className={`text-sm font-normal transition-colors duration-200 sm:text-base ${
              active === i ? "text-[#B5751A]" : "hover:text-[#B5751A]"
            }`}
          >
            {item.label}
          </Link>
        </motion.span>
      ))}
    </nav>
  );
}
