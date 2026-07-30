import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

export type WireframeIconProps = SVGProps<SVGSVGElement>;

/**
 * Static, low-cost SVG version of the hero's wireframe sphere motif — used
 * as a recurring icon outside the hero (footer, section markers) where a
 * full WebGL sphere would be overkill. Purely decorative.
 */
export function WireframeIcon({ className, ...rest }: WireframeIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      className={cn("wireframe-icon", "h-6 w-6 text-accent", className)}
      {...rest}
    >
      <circle cx="12" cy="12" r="10" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="4" ry="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  );
}
