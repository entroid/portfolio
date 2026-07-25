import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Single site-wide default OG image (route-segment file convention cascades
 * to every child route that doesn't define its own) — per-case-study images
 * are a stretch goal per docs/IMPLEMENTATION_PLAN.md Phase 11, not required
 * for v1. Deliberately not localized: same image under /en and /es.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#0a0a0a",
        color: "#f5f5f5",
      }}
    >
      <div
        style={{
          fontSize: 32,
          letterSpacing: 4,
          color: "#8a8a8a",
          textTransform: "uppercase",
          display: "flex",
        }}
      >
        UX/UI Design · Front-End Development
      </div>
      <div
        style={{
          marginTop: 32,
          fontSize: 96,
          fontWeight: 800,
          display: "flex",
        }}
      >
        Hernán Ainsa
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 36,
          color: "#8a8a8a",
          display: "flex",
        }}
      >
        Where design and code actually meet.
      </div>
    </div>,
    { ...size },
  );
}
