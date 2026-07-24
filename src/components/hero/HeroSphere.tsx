"use client";

import dynamic from "next/dynamic";
import { WireframeSphereFallback } from "./WireframeSphereFallback";

// Code-split off the main bundle (per DESIGN_SYSTEM.md/ARCHITECTURE.md) —
// the static fallback paints instantly while the WebGL chunk loads.
const WireframeSphere = dynamic(
  () => import("./WireframeSphere").then((mod) => mod.WireframeSphere),
  { ssr: false, loading: () => <WireframeSphereFallback /> },
);

export function HeroSphere() {
  return <WireframeSphere />;
}
