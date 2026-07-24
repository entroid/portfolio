import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/hero/HeroSection";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <div className="flex min-h-[30vh] items-center justify-center">
        <p className="font-mono text-label uppercase tracking-label text-muted">
          About — under construction
        </p>
      </div>
    </>
  );
}
