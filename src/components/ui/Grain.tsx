"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

export type GrainProps = {
  className?: string;
};

/**
 * Subtle noise texture, per DESIGN_SYSTEM.md — hero, footer, and main
 * titles only, not global. One implementation, reused everywhere it's
 * allowed rather than hand-rolled per section.
 */
export function Grain({ className }: GrainProps) {
  const filterId = useId();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 opacity-5 mix-blend-overlay",
        className,
      )}
    >
      <svg className="h-full w-full">
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.9}
            numOctaves={2}
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>
    </div>
  );
}
