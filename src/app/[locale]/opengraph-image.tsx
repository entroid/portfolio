import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Hernán Ainsa — Portfolio";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Site-wide OG image, one per locale (route-segment file convention cascades
 * to every child route that doesn't define its own) — per-case-study images
 * are a stretch goal per docs/IMPLEMENTATION_PLAN.md Phase 11, not required
 * for v1. Copy lives in `meta.og.*` in the messages, like every other
 * user-facing string.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.og" });

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
    </div>,
    { ...size },
  );
}
