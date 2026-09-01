/**
 * A single scroll-driven animation loop for the whole page.
 *
 * Every effect registers one element here instead of attaching its own
 * scroll listener, so the cost is one rAF tick regardless of how many
 * things are animating. Element positions are measured once (and on
 * resize) rather than per frame, so the loop performs no layout reads at
 * all — it only writes compositor-friendly transforms.
 */
export type FxConfig = {
  /** Vertical drift in px across the element's travel through the viewport. */
  y?: number;
  /** Degrees of X-axis rotation, easing to 0 as the element reaches centre. */
  rotateX?: number;
  /** Degrees of Y-axis rotation, easing to 0 at centre. */
  rotateY?: number;
  /** Z depth in px at the extremes, easing to 0 at centre. */
  z?: number;
  /** Scale applied at the extremes (e.g. 0.92), easing to 1 at centre. */
  scale?: number;
  /** Only animate on the way in (progress < 0), leave settled after. */
  enterOnly?: boolean;
};

type Item = {
  el: HTMLElement;
  cfg: FxConfig;
  top: number;
  height: number;
};

const items = new Set<Item>();
let frame = 0;
let started = false;

function documentTop(el: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

function measure(item: Item) {
  item.top = documentTop(item.el);
  item.height = item.el.offsetHeight;
}

function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v;
}

export function tick() {
  frame = 0;
  const vh = window.innerHeight;
  const scroll = window.scrollY;

  for (const item of items) {
    const centre = item.top + item.height / 2;
    // -1 while entering from below, 0 at viewport centre, 1 once above.
    const p = clamp(
      (scroll + vh / 2 - centre) / (vh / 2 + item.height / 2),
      -1,
      1,
    );
    const t = item.cfg.enterOnly ? Math.min(p, 0) : p;
    const away = Math.abs(t);

    const parts: string[] = [];
    if (item.cfg.y) parts.push(`translate3d(0, ${(-t * item.cfg.y).toFixed(2)}px, 0)`);
    if (item.cfg.z) parts.push(`translateZ(${(-away * item.cfg.z).toFixed(2)}px)`);
    if (item.cfg.rotateX) parts.push(`rotateX(${(t * item.cfg.rotateX).toFixed(2)}deg)`);
    if (item.cfg.rotateY) parts.push(`rotateY(${(t * item.cfg.rotateY).toFixed(2)}deg)`);
    if (item.cfg.scale) {
      const s = 1 - away * (1 - item.cfg.scale);
      parts.push(`scale(${s.toFixed(4)})`);
    }
    item.el.style.transform = parts.join(" ");
  }
}

export function schedule() {
  if (frame) return;
  frame = window.requestAnimationFrame(tick);
}

function onResize() {
  items.forEach(measure);
  schedule();
}

function start() {
  if (started) return;
  started = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
}

export function register(el: HTMLElement, cfg: FxConfig) {
  const item: Item = { el, cfg, top: 0, height: 0 };
  measure(item);
  items.add(item);
  start();
  schedule();
  return () => {
    items.delete(item);
    el.style.transform = "";
  };
}

/** Re-measure after layout-shifting work such as images finishing loading. */
export function remeasure() {
  items.forEach(measure);
  schedule();
}
