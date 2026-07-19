"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

function Char({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative">
      <span className="invisible">{char === " " ? " " : char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char === " " ? " " : char}
      </motion.span>
    </span>
  );
}

/** Character-by-character scroll-reveal text animation. */
export function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = Array.from(text);

  return (
    <p ref={ref} className={className}>
      {chars.map((char, i) => (
        <Char
          key={i}
          char={char}
          index={i}
          total={chars.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}
