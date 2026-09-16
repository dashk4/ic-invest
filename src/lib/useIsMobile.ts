"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-triggered stagger animations and cursor-tracking canvas effects are
 * pure CPU/battery cost on touch devices — there's no cursor to react to,
 * and this is specifically where users reported slow, janky loading.
 * Defaults to false (desktop, today's behavior) until this runs client-side,
 * so nothing changes before hydration.
 */
export function useIsMobile(breakpoint = 767) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mql.matches);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return isMobile;
}
