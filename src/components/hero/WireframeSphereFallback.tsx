import { cn } from "@/lib/cn";

export type WireframeSphereFallbackProps = {
  className?: string;
};

/**
 * Static SVG/CSS fallback for the hero sphere, per DESIGN_SYSTEM.md — used
 * when WebGL isn't available, and as the instant-paint placeholder shown
 * before the WebGL bundle finishes loading. Purely decorative.
 */
export function WireframeSphereFallback({
  className,
}: WireframeSphereFallbackProps) {
  return (
    <svg
      id="wireframe-sphere-fallback"
      aria-hidden="true"
      viewBox="0 0 320 320"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      className={cn("h-full w-full text-accent", className)}
    >
      <circle cx="160" cy="160" r="120" opacity={0.5} />
      <ellipse cx="160" cy="160" rx="120" ry="40" opacity={0.5} />
      <ellipse cx="160" cy="160" rx="120" ry="80" opacity={0.5} />
      <ellipse cx="160" cy="160" rx="40" ry="120" opacity={0.5} />
      <ellipse cx="160" cy="160" rx="80" ry="120" opacity={0.5} />
      <line x1="40" y1="160" x2="280" y2="160" opacity={0.5} />
      <line x1="160" y1="40" x2="160" y2="280" opacity={0.5} />
    </svg>
  );
}
