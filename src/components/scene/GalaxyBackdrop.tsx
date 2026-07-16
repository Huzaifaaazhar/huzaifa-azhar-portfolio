"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

const Galaxy = dynamic(() => import("./Galaxy").then((m) => m.Galaxy), {
  ssr: false,
});

type NetworkInformation = { saveData?: boolean };

function subscribe() {
  return () => {};
}

function getSnapshot() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const saveData = (navigator as Navigator & { connection?: NetworkInformation })
    .connection?.saveData;
  return !saveData;
}

function getServerSnapshot() {
  return false;
}

/**
 * WebGL starfield layered over the static `.aurora-backdrop` gradient
 * (still rendered behind this in layout.tsx, which is why this only needs
 * to add stars, not its own background). Skipped under
 * prefers-reduced-motion or the Save-Data hint — the CSS gradient alone is
 * the fallback then.
 *
 * `useSyncExternalStore` with a `false` server snapshot means server and
 * client agree on "don't mount" through hydration (matchMedia/Save-Data
 * can't be read on the server); React re-checks the real value right after
 * and mounts then if it should.
 */
export function GalaxyBackdrop() {
  const shouldMount = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!shouldMount) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[-1]" aria-hidden="true">
      <Galaxy />
    </div>
  );
}
