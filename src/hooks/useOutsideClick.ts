"use client";

import { useEffect, type RefObject } from "react";

/**
 * Fires when a pointer goes down outside `ref`.
 *
 * The published hook types the ref as `RefObject<HTMLDivElement>` and the
 * callback as `Function`; both are loosened here so it composes with
 * `useRef<T>(null)` and keeps the event typed.
 */
export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
