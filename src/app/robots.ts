import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /dev/* are local QA surfaces, not part of the portfolio.
      disallow: "/dev/",
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
