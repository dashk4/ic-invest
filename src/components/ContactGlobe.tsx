"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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

const ARCS = DESTINATIONS.flatMap((d, i) => [
  {
    order: i + 1,
    startLat: UB.lat,
    startLng: UB.lng,
    endLat: d.lat,
    endLng: d.lng,
    arcAlt: 0.2 + (i % 3) * 0.12,
    color: i % 2 ? JADE : JADE_DEEP,
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
  // Fine to pay this eagerly, off-screen: it's a small decorative scene on a
  // page whose whole point is to be scrolled through, not conditional on
  // whether it's currently in view.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200));
    idle(() => {
      loadGlobe().then(() => setReady(true));
    });
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none relative aspect-square w-full max-w-[540px]"
    >
      {ready ? <World globeConfig={CONFIG} data={ARCS} /> : <GlobePlaceholder />}
    </div>
  );
}
