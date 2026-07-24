import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

export type CrosshairProps = SVGProps<SVGSVGElement>;

/** Small decorative crosshair mark, positioned at section corners. */
export function Crosshair({ className, ...rest }: CrosshairProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      className={cn("h-4 w-4 text-grid-border", className)}
      {...rest}
    >
      <line x1="12" y1="0" x2="12" y2="9" />
      <line x1="12" y1="15" x2="12" y2="24" />
      <line x1="0" y1="12" x2="9" y2="12" />
      <line x1="15" y1="12" x2="24" y2="12" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
