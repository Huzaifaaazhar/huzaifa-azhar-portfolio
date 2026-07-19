"use client";

import { motion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

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
  const initial = { opacity: 0, x, y };
  const whileInView = { opacity: 1, x: 0, y: 0 };
  const viewport = { once: true, margin: "50px", amount: 0 } as const;
  const transition = { duration, delay, ease: EASE };

  if (as === "h1") {
    return (
      <motion.h1
        className={className}
        initial={initial}
        whileInView={whileInView}
        viewport={viewport}
        transition={transition}
      >
        {children}
      </motion.h1>
    );
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
