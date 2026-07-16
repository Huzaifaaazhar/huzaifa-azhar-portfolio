"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { getPageTransition } from "./pageTransitionController";

/**
 * A same-origin <Link> that plays the page-transition overlay (aurora-wipe,
 * or a plain fade under prefers-reduced-motion — see PageTransitionOverlay)
 * before navigating, instead of a hard route swap. Modified clicks (new
 * tab, etc.) are left to behave natively.
 */
export function TransitionLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();

  async function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const transition = getPageTransition();
    if (!transition) return;

    e.preventDefault();
    await transition.cover(e.clientX, e.clientY);
    router.push(href);
    // Let the new route mount while fully covered before revealing it.
    await new Promise((resolve) => setTimeout(resolve, 150));
    await transition.reveal();
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
