import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type GridOverlayProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Dotted grid-line color, baked directly into the generated SVG. A
   * data-URI SVG used as `background-image` is an isolated external
   * resource — unlike a plain CSS gradient, its `currentColor` can NOT
   * inherit from this element's `color`, so the color must be passed in and
   * rendered as a literal value rather than set via className/style.
   */
  color?: string;
  /** Color of the highlighted "+" mark at each intersection. */
  color2?: string;
};

const CELL = 99;
// Matches --color-grid-border in globals.css — kept as a literal default
// here because a color used inside the generated SVG can't reference a live
// CSS custom property (see the `color` prop doc above).
const DEFAULT_COLOR = "rgba(255, 255, 255, 0.51)";

// One tile = one grid cell, with the intersection drawn at its *center*
// (not its corner) so the "+" mark has room to render symmetrically without
// being clipped at a tile seam. `backgroundPosition` below shifts the whole
// pattern by half a cell so intersections still land on the same 0, 48, 96…
// coordinates the rest of the layout (Crosshair corners, etc.) expects.
function buildGridTileSvg(color: string, color2: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CELL}" height="${CELL}" viewBox="0 0 ${CELL} ${CELL}">
  <line x1="0" y1="${CELL / 2}" x2="${CELL}" y2="${CELL / 2}" stroke="${color}" stroke-width="1" stroke-dasharray="2 3" stroke-linecap="round" />
  <line x1="${CELL / 2}" y1="0" x2="${CELL / 2}" y2="${CELL}" stroke="${color}" stroke-width="1" stroke-dasharray="2 3" stroke-linecap="round" />
  <line x1="${CELL / 2 - 4}" y1="${CELL / 2}" x2="${CELL / 2 + 4}" y2="${CELL / 2}" stroke="${color2}" stroke-width="3" stroke-linecap="round" />
  <line x1="${CELL / 2}" y1="${CELL / 2 - 4}" x2="${CELL / 2}" y2="${CELL / 2 + 4}" stroke="${color2}" stroke-width="3" stroke-linecap="round" />
</svg>`;
}

function buildGridStyle(color: string, color2: string): CSSProperties {
  return {
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(buildGridTileSvg(color, color2))}")`,
    backgroundSize: `${CELL}px ${CELL}px`,
    backgroundPosition: `${-CELL / 2}px ${-CELL / 2}px`,
  };
}

/**
 * Dotted background grid decoration with a highlighted "+" at each
 * intersection, per DESIGN_SYSTEM.md — hero, nav, and section-ends only,
 * never inside case study bodies. Purely decorative.
 */
export function GridOverlay({
  className,
  style,
  color = DEFAULT_COLOR,
  color2 = DEFAULT_COLOR,
  ...rest
}: GridOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "grid-overlay",
        "pointer-events-none absolute inset-0",
        className,
      )}
      style={{ ...buildGridStyle(color, color2), ...style }}
      {...rest}
    >
      <div className="grid-shadow-overlay" />
    </div>
  );
}
