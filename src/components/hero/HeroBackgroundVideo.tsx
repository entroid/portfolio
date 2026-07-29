"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Full-bleed looping background video, sat behind `GridOverlay` in
 * `HeroSection`. Paused (first frame only) under `prefers-reduced-motion`,
 * matching the pattern used by `WireframeSphere`.
 */
export function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      video.pause();
    } else {
      video.play()?.catch(() => {});
    }
  }, [reducedMotion]);

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover opacity-70"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    >
      <source src="/vids/10487952-sd_426_240_24fps.mp4" type="video/mp4" />
    </video>
  );
}
