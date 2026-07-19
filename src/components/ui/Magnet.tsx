"use client";

import { useRef, useState, type ReactNode } from "react";

const ACTIVE_TRANSITION = "transform 0.3s ease-out";
const INACTIVE_TRANSITION = "transform 0.6s ease-in-out";

/**
 * Mouse-following magnetic hover effect. Activates when the cursor is
 * within `padding` px of the wrapped element's edges, translating it
 * toward the cursor divided by `strength`.
 */
export function Magnet({
  children,
  padding = 100,
  strength = 3,
  className,
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = wrapperRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = Math.abs(e.clientX - centerX) - rect.width / 2;
    const distY = Math.abs(e.clientY - centerY) - rect.height / 2;

    if (distX < padding && distY < padding) {
      setIsActive(true);
      setTranslate({
        x: (e.clientX - centerX) / strength,
        y: (e.clientY - centerY) / strength,
      });
    } else {
      setIsActive(false);
      setTranslate({ x: 0, y: 0 });
    }
  }

  function handleMouseLeave() {
    setIsActive(false);
    setTranslate({ x: 0, y: 0 });
  }

  return (
    <div
      ref={wrapperRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${translate.x}px, ${translate.y}px, 0)`,
        transition: isActive ? ACTIVE_TRANSITION : INACTIVE_TRANSITION,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
