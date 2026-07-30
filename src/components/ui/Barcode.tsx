import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

export type BarcodeProps = SVGProps<SVGSVGElement>;

// Fixed bar widths give the decoration a barcode-like look without needing
// a real encoding — it's purely decorative, not a scannable code. Computed
// once at module scope (not during render) since the pattern is static.
const BAR_WIDTHS = [1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 1];

const BARS: { x: number; width: number }[] = (() => {
  let cursor = 0;
  return BAR_WIDTHS.map((width) => {
    const bar = { x: cursor, width };
    cursor += width + 1;
    return bar;
  });
})();

const TOTAL_WIDTH =
  BARS.length > 0 ? BARS[BARS.length - 1].x + BARS[BARS.length - 1].width : 0;

/** Decorative barcode pattern, per DESIGN_SYSTEM.md's recurring motifs. */
export function Barcode({ className, ...rest }: BarcodeProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${TOTAL_WIDTH} 16`}
      fill="currentColor"
      className={cn("barcode", "h-4 text-fg", className)}
      {...rest}
    >
      {BARS.map((bar, index) => (
        <rect key={index} x={bar.x} y={0} width={bar.width} height={16} />
      ))}
    </svg>
  );
}
