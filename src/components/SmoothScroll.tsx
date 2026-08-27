"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      wheelMultiplier: 0.85,
      gestureOrientation: "vertical",
      smoothWheel: true,
      // native CSS smooth-behavior is off (see globals.css) so this is the
      // only thing animating hash-link jumps now — otherwise they'd snap
      anchors: true,
    });
    setLenis(lenis);

    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
