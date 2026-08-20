import type { ReactNode } from "react";

export function Marquee({ items }: { items: ReactNode[] }) {
  const doubled = [...items, ...items];

  return (
    <div className="relative my-12 overflow-hidden border-y border-line-strong py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-strong to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface-strong to-transparent" />
      <div className="animate-marquee flex w-max items-center gap-10">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="eyebrow whitespace-nowrap text-on-strong-subtle">{item}</span>
            <span className="h-1 w-1 rounded-full bg-accent/60" />
          </div>
        ))}
      </div>
    </div>
  );
}
