import { useLocale, useTranslations } from "next-intl";
import { Grain } from "@/components/ui/Grain";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { siteLinks } from "@/lib/site-links";
import { GithubIcon } from "@/components/ui/GithubIcon";

const linkClass =
  "group inline-flex items-center font-mono text-label uppercase tracking-label text-muted transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const cvPath = locale === "es" ? siteLinks.cvPathEs : siteLinks.cvPathEn;

  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-grid-border"
    >
      <Grain />
      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 py-10 md:px-8">
        <p
          data-testid="footer-status"
          className="font-mono text-label uppercase tracking-label text-muted md:text-label-desktop"
        >
          {t("status")}
        </p>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <nav
            aria-label={t("email")}
            className="flex flex-wrap items-center gap-6"
          >
            <a
              href={`mailto:${siteLinks.email}`}
              data-testid="footer-email"
              className={linkClass}
            >
              <BracketLabel>{t("email")}</BracketLabel>
            </a>
            <a
              href={siteLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              data-testid="footer-linkedin"
              className={linkClass}
            >
              <BracketLabel>{t("linkedin")}</BracketLabel>
            </a>
            <a
              href={siteLinks.whatsapp}
              target="_blank"
              rel="noreferrer"
              data-testid="footer-whatsapp"
              className={linkClass}
            >
              <BracketLabel>{t("whatsapp")}</BracketLabel>
            </a>
            <a
              href={cvPath}
              download
              data-testid="footer-cv"
              className={linkClass}
            >
              <BracketLabel>{tNav("cv")}</BracketLabel>
            </a>
            <a
              href={siteLinks.github}
              target="_blank"
              rel="noreferrer"
              aria-label={tNav("github")}
              data-testid="footer-github"
              className={linkClass}
            >
              <GithubIcon />
            </a>
          </nav>
          <p className="font-mono text-label text-muted">
            © {new Date().getFullYear()} Hernán Ainsa — {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
