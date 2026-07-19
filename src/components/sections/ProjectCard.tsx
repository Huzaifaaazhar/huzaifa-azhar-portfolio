"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LiveProjectButton } from "@/components/ui/LiveProjectButton";
import type { LandingProject } from "@/data/landingProjects";

export function ProjectCard({
  project,
  index,
  total,
}: {
  project: LandingProject;
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
      className="sticky top-24 h-[85vh] md:top-32"
      style={{ top: `${index * 28}px` }}
    >
      <motion.div
        style={{ scale }}
        className="flex h-full flex-col gap-4 rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:gap-6 sm:rounded-[50px] sm:p-6 md:gap-8 md:rounded-[60px] md:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span
              className="font-black text-[#D7E2EA]"
              style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
            >
              {project.number}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA] opacity-60 sm:text-sm">
                {project.category}
              </span>
              <h3 className="text-lg font-medium uppercase text-[#D7E2EA] sm:text-2xl md:text-3xl">
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton href={`/products#${project.slug}`} />
        </div>

        <div className="flex flex-1 gap-3">
          <div className="flex w-[40%] flex-col gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.col1Image1}
              alt=""
              className="w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.col1Image2}
              alt=""
              className="w-full flex-1 rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            />
          </div>
          <div className="w-[60%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.col2Image}
              alt={project.name}
              className="h-full w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
