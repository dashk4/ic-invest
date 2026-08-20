"use client";

import { motion } from "framer-motion";

type Tower = {
  x: number;
  y: number;
  w: number;
  h: number;
  cols: number;
  rows: number;
  lit: [number, number][];
};

const TOWERS: Tower[] = [
  {
    x: 40,
    y: 330,
    w: 90,
    h: 430,
    cols: 4,
    rows: 14,
    lit: [
      [1, 3],
      [3, 5],
      [2, 8],
    ],
  },
  {
    x: 150,
    y: 180,
    w: 120,
    h: 580,
    cols: 5,
    rows: 19,
    lit: [
      [1, 4],
      [4, 6],
      [2, 10],
      [3, 13],
      [0, 15],
      [4, 3],
    ],
  },
  {
    x: 290,
    y: 260,
    w: 100,
    h: 500,
    cols: 4,
    rows: 16,
    lit: [
      [0, 5],
      [2, 7],
      [3, 11],
    ],
  },
  {
    x: 410,
    y: 60,
    w: 140,
    h: 700,
    cols: 6,
    rows: 23,
    lit: [
      [1, 5],
      [5, 4],
      [3, 9],
      [0, 12],
      [4, 14],
      [2, 17],
      [5, 19],
      [1, 20],
    ],
  },
];

function TowerShape({ tower, index }: { tower: Tower; index: number }) {
  const { x, y, w, h, cols, rows, lit } = tower;
  const colW = w / cols;
  const rowH = h / rows;

  return (
    <motion.g
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.15 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <rect x={x} y={y} width={w} height={h} fill="url(#towerFill)" />
      <rect x={x} y={y} width={w} height={h} fill="none" stroke="#ddc79a" strokeOpacity={0.35} strokeWidth={1} />

      {Array.from({ length: cols - 1 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={x + colW * (i + 1)}
          y1={y}
          x2={x + colW * (i + 1)}
          y2={y + h}
          stroke="#ddc79a"
          strokeOpacity={0.14}
          strokeWidth={1}
        />
      ))}
      {Array.from({ length: rows - 1 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1={x}
          y1={y + rowH * (i + 1)}
          x2={x + w}
          y2={y + rowH * (i + 1)}
          stroke="#ddc79a"
          strokeOpacity={0.1}
          strokeWidth={1}
        />
      ))}

      {lit.map(([col, row], i) => (
        <motion.rect
          key={i}
          x={x + colW * col + colW * 0.22}
          y={y + rowH * row + rowH * 0.22}
          width={colW * 0.56}
          height={rowH * 0.56}
          fill="#e4c98f"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0.6, 0.9] }}
          transition={{
            duration: 4 + (i % 3),
            delay: 1.2 + index * 0.2 + i * 0.3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.g>
  );
}

export function BuildingArt() {
  return (
    <svg
      viewBox="0 0 600 800"
      className="h-full w-full"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="towerFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16304a" />
          <stop offset="100%" stopColor="#0a1a2b" />
        </linearGradient>
        <linearGradient id="fadeMask" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="45%" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <mask id="edgeMask">
          <rect x="0" y="0" width="600" height="800" fill="url(#fadeMask)" />
        </mask>
      </defs>
      <g mask="url(#edgeMask)">
        {TOWERS.map((t, i) => (
          <TowerShape key={i} tower={t} index={i} />
        ))}
      </g>
    </svg>
  );
}
