import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getAllProjectSlugs, getProjectBySlug } from "@/content/lib";
import { CaseStudyTemplate } from "@/components/work/CaseStudyTemplate";
import { OtherWorkTemplate } from "@/components/work/OtherWorkTemplate";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!getAllProjectSlugs().includes(slug)) {
    return {};
  }

  const project = await getProjectBySlug(slug, locale as Locale);
  const { title, summary } = project.frontmatter;

  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      type: "article",
      locale,
      images: [{ url: project.meta.coverImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: summary,
      images: [project.meta.coverImage],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!getAllProjectSlugs().includes(slug)) {
    notFound();
  }

  const project = await getProjectBySlug(slug, locale as Locale);

  return project.meta.depth === "featured" ? (
    <CaseStudyTemplate project={project} />
  ) : (
    <OtherWorkTemplate project={project} />
  );
}
