import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getAllProjects } from "@/content/lib";
import { WorkIndex } from "@/components/work/WorkIndex";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = await getAllProjects(locale as Locale);

  return <WorkIndex projects={projects} />;
}
