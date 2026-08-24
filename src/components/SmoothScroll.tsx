"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.85,
      gestureOrientation: "vertical",
      smoothWheel: true,
    });
    setLenis(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
