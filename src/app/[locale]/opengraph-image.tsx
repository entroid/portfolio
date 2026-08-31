import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Hernán Ainsa — Portfolio";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Satori can't read `--font-jetbrains-mono` (no CSS custom properties, no
// webfont loading), so the same JetBrains Mono the hero uses is vendored as
// raw TTF and handed to `ImageResponse` directly. Latin subset, same v24
// files Google Fonts serves to next/font.
const FONT_DIR = join(process.cwd(), "src/app/_fonts");

// Mirrors GridOverlay's 99px cell so the OG card reads as the same surface
// as the hero it screenshots.
const CELL = 99;
const GRID_LINE = "rgba(255, 255, 255, 0.13)";
const GRID_MARK = "rgba(255, 255, 255, 0.28)";

/**
 * The dotted-grid decoration, rebuilt out of plain divs. `GridOverlay`'s
 * data-URI SVG tile and `mask-image` fade both rely on CSS satori doesn't
 * implement, so the vertical fade is applied per-line as an opacity ramp
 * instead — brightest at the bottom, like the hero.
 */
function Grid() {
  const columns = Math.ceil(size.width / CELL);
  const rows = Math.ceil(size.height / CELL);
  const fade = (row: number) => 0.25 + (row / rows) * 0.75;

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex" }}>
      {Array.from({ length: rows }, (_, row) => (
        <div
          key={`row-${row}`}
          style={{
            position: "absolute",
            top: row * CELL,
            left: 0,
            width: size.width,
            height: 1,
            backgroundColor: GRID_LINE,
            opacity: fade(row),
          }}
        />
      ))}
      {Array.from({ length: columns }, (_, column) =>
        Array.from({ length: rows }, (_, row) => (
          <div
            key={`mark-${column}-${row}`}
            style={{
              position: "absolute",
              top: row * CELL - 1,
              left: column * CELL - 5,
              width: 11,
              height: 3,
              backgroundColor: GRID_MARK,
              opacity: fade(row),
            }}
          />
        )),
      )}
      {Array.from({ length: columns }, (_, column) => (
        <div
          key={`column-${column}`}
          style={{
            position: "absolute",
            top: 0,
            left: column * CELL,
            width: 1,
            height: size.height,
            backgroundColor: GRID_LINE,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Site-wide OG image, one per locale (route-segment file convention cascades
 * to every child route that doesn't define its own) — per-case-study images
 * are a stretch goal per docs/IMPLEMENTATION_PLAN.md Phase 11, not required
 * for v1. Copy lives in `meta.og.*` in the messages, like every other
 * user-facing string; the composition mirrors the hero (mono type, dotted
 * grid, dark field) so a shared link previews as the page it opens.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [t, regular, extraBold] = await Promise.all([
    getTranslations({ locale, namespace: "meta.og" }),
    readFile(join(FONT_DIR, "JetBrainsMono-Regular.ttf")),
    readFile(join(FONT_DIR, "JetBrainsMono-ExtraBold.ttf")),
  ]);

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
        fontFamily: "JetBrains Mono",
        position: "relative",
      }}
    >
      <Grid />
      {/* Stands in for the hero's background video: a soft off-centre
            glow, the one part of that surface satori can express. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(120% 90% at 78% 88%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 38%, rgba(10,10,10,0) 70%)",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 3,
            color: "#8a8a8a",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          {t("kicker")}
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -2,
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
          {t("tagline")}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: regular, weight: 400, style: "normal" },
        {
          name: "JetBrains Mono",
          data: extraBold,
          weight: 800,
          style: "normal",
        },
      ],
    },
  );
}
