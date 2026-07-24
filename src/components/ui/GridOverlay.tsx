import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type GridOverlayProps = HTMLAttributes<HTMLDivElement>;

/**
 * Thin-line background grid decoration, per DESIGN_SYSTEM.md — hero, nav,
 * and section-ends only, never inside case study bodies. Purely decorative.
 */
export function GridOverlay({ className, ...rest }: GridOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0",
        "bg-[image:linear-gradient(to_right,var(--color-grid-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid-border)_1px,transparent_1px)]",
        "bg-[size:48px_48px]",
        className,
      )}
      {...rest}
    />
  );
}
