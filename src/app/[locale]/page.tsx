import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getAllProjects } from "@/content/lib";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FeaturedWork } from "@/components/sections/FeaturedWork";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");

  return {
    // No `title` field here: this is the root page, so it should keep the
    // root layout's `default` title as-is rather than running it back
    // through the `%s — siteName` template (which would double the name).
    // openGraph/twitter aren't deep-merged across segments, so they're
    // repeated in full rather than assumed to inherit from the layout.
    description,
    openGraph: { title, description, type: "website", locale },
    twitter: { title, description },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const featured = (await getAllProjects(locale as Locale))
    .filter((project) => project.meta.depth === "featured")
    .slice(0, 3)
    .map(({ meta, frontmatter }) => ({ meta, frontmatter }));

  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedWork projects={featured} />
    </>
  );
}
