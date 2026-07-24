import { useTranslations } from "next-intl";
import { Grain } from "@/components/ui/Grain";
import { siteLinks } from "@/lib/site-links";

const linkClass =
  "font-mono text-label uppercase tracking-label text-muted transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative overflow-hidden border-t border-grid-border">
      <Grain />
      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <nav
          aria-label={t("email")}
          className="flex flex-wrap items-center gap-6"
        >
          <a href={`mailto:${siteLinks.email}`} className={linkClass}>
            {t("email")}
          </a>
          <a
            href={siteLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            {t("linkedin")}
          </a>
          <a
            href={siteLinks.whatsapp}
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            {t("whatsapp")}
          </a>
        </nav>
        <p className="font-mono text-label text-muted">
          © {new Date().getFullYear()} Hernán Ainsa — {t("rights")}
        </p>
      </div>
    </footer>
  );
}
