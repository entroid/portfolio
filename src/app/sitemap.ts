import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllProjectSlugs } from "@/content/lib";
import { siteConfig } from "@/lib/site-config";

/**
 * Covers all five route shapes across both locale prefixes (next-intl's
 * default `localePrefix` mode prefixes the default locale too, so there's
 * no unprefixed root path to list — see docs/IMPLEMENTATION_PLAN.md Phase 2
 * notes).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/work", "/ai-workflow", "/contact"];
  const slugs = getAllProjectSlugs();

  const paths = [...staticPaths, ...slugs.map((slug) => `/work/${slug}`)];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteConfig.siteUrl}/${locale}${path}`,
      lastModified: new Date(),
    })),
  );
}
