import type { ReactNode } from "react";

export function RollText({
  children,
  hoverClassName = "text-accent",
  as: As = "span",
}: {
  children: ReactNode;
  hoverClassName?: string;
  as?: "span" | "div";
}) {
  return (
    <As className="relative inline-block overflow-hidden align-top">
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className={`absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0 ${hoverClassName}`}
      >
        {children}
      </span>
    </As>
  );
}
