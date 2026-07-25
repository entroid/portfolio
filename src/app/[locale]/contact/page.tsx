import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ContactPage as ContactPageComponent } from "@/components/contact/ContactPage";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactPageComponent />;
}
