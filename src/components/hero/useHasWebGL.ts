"use client";

import { useSyncExternalStore } from "react";

// WebGL support doesn't change over a session, so this is a one-time check
// cached at module scope rather than a real subscription — mirrors
// useReducedMotion's useSyncExternalStore pattern (see src/lib/useReducedMotion.ts)
// to avoid the "setState in an effect" cascading-render lint error.
let cachedHasWebGL: boolean | null = null;

function checkWebGL(): boolean {
  if (cachedHasWebGL !== null) return cachedHasWebGL;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    cachedHasWebGL = Boolean(gl);
  } catch {
    cachedHasWebGL = false;
  }

  return cachedHasWebGL;
}

function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return null;
}

/**
 * Detects real WebGL support by attempting to create a context — `null`
 * on the server/before hydration (safe fallback), `true`/`false` on the
 * client once checked.
 */
export function useHasWebGL(): boolean | null {
  return useSyncExternalStore(subscribe, checkWebGL, getServerSnapshot);
}
