"use client";

import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const localeLabel: Record<(typeof routing.locales)[number], string> = {
  en: "EN",
  es: "ES",
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={cn("flex items-center gap-1 font-mono text-label", className)}
    >
      {routing.locales.map((loc, index) => (
        <div key={loc} className="flex items-center gap-1">
          {index > 0 && (
            <span aria-hidden="true" className="text-muted">
              /
            </span>
          )}
          <button
            type="button"
            aria-current={loc === locale ? "true" : undefined}
            onClick={() => router.replace(pathname, { locale: loc })}
            className={cn(
              "uppercase tracking-label transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              loc === locale ? "text-accent" : "text-muted hover:text-fg",
            )}
          >
            {localeLabel[loc]}
          </button>
        </div>
      ))}
    </div>
  );
}
