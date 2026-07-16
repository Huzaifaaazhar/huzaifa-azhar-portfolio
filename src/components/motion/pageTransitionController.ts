/**
 * A tiny singleton bridging TransitionLink (anywhere in the tree) to the
 * PageTransitionOverlay mounted once in the root layout. Simpler than a
 * context provider for a single imperative play/reverse pair with one
 * consumer type.
 */
type PageTransitionController = {
  cover: (x: number, y: number) => Promise<void>;
  reveal: () => Promise<void>;
};

let controller: PageTransitionController | null = null;

export function registerPageTransition(next: PageTransitionController) {
  controller = next;
}

export function getPageTransition() {
  return controller;
}
