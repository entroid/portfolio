/**
 * Site-wide constants for metadata (metadataBase, sitemap, OG/Twitter tags).
 * `siteUrl` is the production origin. The site currently ships on its
 * Vercel domain by choice; pointing a custom domain at it is a one-line
 * change here, which propagates to metadataBase, the sitemap and OG tags.
 */
export const siteConfig = {
  siteUrl: "https://hernan-ainsa.vercel.app",
  siteName: "Hernán Ainsa — Portfolio",
  twitterHandle: undefined as string | undefined,
} as const;
