import type Lenis from "lenis";

/**
 * Module-level handle on the Lenis instance.
 *
 * `body { overflow: hidden }` alone does not hold the page still while a modal
 * is open: Lenis drives scrolling programmatically, so it keeps moving the page
 * behind the overlay. Anything that locks scrolling needs to pause it too.
 */
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function stopLenis() {
  instance?.stop();
}

export function startLenis() {
  instance?.start();
}
