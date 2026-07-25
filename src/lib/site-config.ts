/**
 * Site-wide constants for metadata (metadataBase, sitemap, OG/Twitter tags).
 * `siteUrl` is a placeholder Vercel preview domain until Hernán confirms a
 * production domain (tracked in docs/ARCHITECTURE.md's "Open items to
 * confirm") — swap it in Phase 13.
 */
export const siteConfig = {
  siteUrl: "https://hernan-ainsa.vercel.app",
  siteName: "Hernán Ainsa — Portfolio",
  twitterHandle: undefined as string | undefined,
} as const;
