"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialCard({
  testimonial,
  index,
  total,
}: {
  testimonial: Testimonial;
  index: number;
  total: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="sticky top-24 h-[65vh] md:top-32"
      style={{ top: `${index * 28}px` }}
    >
      <motion.div
        style={{ scale }}
        className="flex h-full flex-col justify-between rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-8 sm:rounded-[50px] sm:p-12 md:rounded-[60px] md:p-16"
      >
        <span
          className="hero-heading leading-none"
          style={{ fontSize: "clamp(3rem, 8vw, 100px)" }}
        >
          &ldquo;
        </span>
        <p
          className="font-[family-name:var(--font-serif)] leading-snug text-[#D7E2EA]"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 2rem)" }}
        >
          {testimonial.quote}
        </p>
        <div className="mt-8 flex flex-col gap-1">
          <span className="text-lg font-medium text-[#D7E2EA]">
            {testimonial.author}
          </span>
          <span className="text-sm text-[#D7E2EA]/60">
            {testimonial.role}, {testimonial.company}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
