"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * three + three-globe + r3f + drei is well over a megabyte, so the globe is
 * code-split, and mounting it costs real one-time CPU work on top of that
 * (WebGL context, shaders, building the country-polygon geometry). Both used
 * to only happen once the section scrolled within 300px of the viewport,
 * which meant the download AND the init started at the exact moment the user
 * was already staring at the empty placeholder. Both now run during idle time
 * right after the page loads (see ContactGlobe below) instead of waiting on
 * scroll proximity, so by the time the user actually reaches this section the
 * globe is already built, not just downloaded.
 */
const loadGlobe = () => import("./ui/Globe").then((m) => m.World);
const World = dynamic(loadGlobe, {
  ssr: false,
  loading: () => <GlobePlaceholder />,
});

// Ulaanbaatar, and the markets the funds reach
const UB = { lat: 47.8864, lng: 106.9057 };
const DESTINATIONS = [
  { lat: 40.7128, lng: -74.006 }, // New York — Nasdaq, where INQ ETF invests
  { lat: 51.5074, lng: -0.1278 }, // London
  { lat: 35.6762, lng: 139.6503 }, // Tokyo
  { lat: 22.3193, lng: 114.1694 }, // Hong Kong
  { lat: 1.3521, lng: 103.8198 }, // Singapore
  { lat: 39.9042, lng: 116.4074 }, // Beijing
];

const JADE = "#6fbfa3";
const JADE_DEEP = "#4a9d81";
const BRAND_RED = "#da2128";

const ARCS = DESTINATIONS.flatMap((d, i) => [
  {
    order: i + 1,
    startLat: UB.lat,
    startLng: UB.lng,
    endLat: d.lat,
    endLng: d.lng,
    arcAlt: 0.2 + (i % 3) * 0.12,
    color: i % 3 === 0 ? BRAND_RED : i % 2 ? JADE : JADE_DEEP,
  },
  {
    order: i + 1,
    startLat: d.lat,
    startLng: d.lng,
    endLat: UB.lat,
    endLng: UB.lng,
    arcAlt: 0.18 + (i % 2) * 0.14,
    color: JADE,
  },
]);

const CONFIG = {
  pointSize: 3,
  globeColor: "#0e1311",
  showAtmosphere: true,
  atmosphereColor: "#6fbfa3",
  atmosphereAltitude: 0.12,
  emissive: "#0e1311",
  emissiveIntensity: 0.12,
  shininess: 0.9,
  polygonColor: "rgba(111,191,163,0.55)",
  ambientLight: "#6fbfa3",
  directionalLeftLight: "#f6f3ed",
  directionalTopLight: "#f6f3ed",
  pointLight: "#f6f3ed",
  arcTime: 1800,
  arcLength: 0.85,
  rings: 1,
  maxRings: 3,
  initialPosition: UB,
  autoRotate: true,
  autoRotateSpeed: 0.6,
};

function GlobePlaceholder() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-3/5 w-3/5 rounded-full border border-[color:var(--jade-400)]/25" />
    </div>
  );
}

export function ContactGlobe() {
  // Downloading eagerly on page load (the previous approach) put this 1MB+
  // bundle in direct bandwidth contention with the rest of the page — on a
  // slow connection that meant fonts, images and the page's own JS all lost
  // out to a 3D globe nobody had scrolled to yet. There's also no reliable
  // way to detect "slow connection" and skip the eager fetch selectively:
  // the Network Information API (navigator.connection) doesn't exist in
  // Safari/WebKit at all, so a connection-aware branch would silently never
  // trigger for a large share of mobile visitors. Loading once the section
  // is actually approaching — not immediately, not only once fully in view —
  // is the one strategy that behaves the same for everyone.
  const [ready, setReady] = useState(false);
  // Actually RUNNING the scene (r3f's render loop + OrbitControls'
  // autoRotate, which rides on it) is a further, separate cost, and a
  // continuously rendering canvas turned out to periodically disturb page
  // layout enough to snap the scroll position back — reported as scroll
  // "catching" and reversing direction while reading the News section, well
  // before Contact was ever in view. Confirmed by bisection: the disturbance
  // tracked with the render loop running, not with the one-time mount, and
  // not with Lenis. So the render loop itself only runs while this section
  // is actually near the viewport — built ahead of time, but inert until
  // there's a reason for it to be moving.
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Generous positive margin: start the download+build well before the
    // section is on screen, so it's typically ready by the time a normally
    // paced scroll gets there, without competing with the initial page load.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadGlobe().then(() => setReady(true));
      },
      { rootMargin: "800px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Negative margin on purpose: the render loop should only wake up once
    // the globe is substantially inside the viewport, not just peeking in —
    // that keeps it fully inert for the entire length of the News section
    // above it, which is where the layout disturbance was actually reported.
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "-200px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none relative aspect-square w-full overflow-hidden"
    >
      {ready ? (
        <World globeConfig={CONFIG} data={ARCS} frameloop={inView ? "always" : "never"} />
      ) : (
        <GlobePlaceholder />
      )}
    </div>
  );
}
