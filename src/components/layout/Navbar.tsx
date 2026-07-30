"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronDown, Download, Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { LinkedinIcon } from "@/components/ui/LinkedinIcon";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { siteLinks } from "@/lib/site-links";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "/work", key: "work" },
  { href: "/ai-workflow", key: "aiWorkflow" },
  { href: "/contact", key: "contact" },
] as const;

const cvLinks = [
  { href: siteLinks.cvPathEn, labelKey: "cvEnglish" },
  { href: siteLinks.cvPathEs, labelKey: "cvSpanish" },
] as const;

const navLinkClass =
  "group inline-flex items-center font-mono text-cta uppercase tracking-cta transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const externalLinkClass =
  "inline-flex text-cta items-center gap-1 font-mono  uppercase tracking-label text-muted transition-colors duration-150 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const socialIconLinkClass =
  "inline-flex items-center text-muted transition-colors duration-150 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      id="navbar"
      className="sticky top-0 z-50 border-b border-grid-border bg-bg/95 backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 py-4 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <Image
            src="/images/profile-placeholder.svg"
            alt=""
            width={32}
            height={32}
            className="border border-grid-border"
          />
          <span className="font-mono text-label uppercase tracking-label text-fg">
            Hernán Ainsa
          </span>
        </Link>

        <nav
          data-testid="nav-desktop"
          aria-label={t("start")}
          className="hidden items-center gap-4 lg:flex"
        >
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`nav-link-${item.key}`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  navLinkClass,
                  active ? "text-accent cursor-default" : "text-muted",
                )}
              >
                <BracketLabel>{t(item.key)}</BracketLabel>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={siteLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={t("linkedin")}
            data-testid="nav-linkedin"
            className={socialIconLinkClass}
          >
            <LinkedinIcon />
          </a>
          <a
            href={siteLinks.github}
            target="_blank"
            rel="noreferrer"
            aria-label={t("github")}
            data-testid="nav-github"
            className={socialIconLinkClass}
          >
            <GithubIcon />
          </a>
          <div className="group relative">
            <button
              type="button"
              data-testid="nav-cv-toggle"
              className={externalLinkClass}
            >
              {t("cv")}
              <ChevronDown aria-hidden="true" size={12} />
            </button>

            <div
              role="menu"
              aria-label={t("cv")}
              className="absolute top-full right-0 z-10 flex min-w-[140px] flex-col border border-grid-border bg-bg py-1 opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto"
            >
              {cvLinks.map((cv) => (
                <a
                  key={cv.href}
                  role="menuitem"
                  href={cv.href}
                  download
                  data-testid={`nav-cv-${cv.labelKey}`}
                  className="flex items-center justify-between gap-4 px-3 py-2 font-mono text-label uppercase tracking-label text-muted transition-colors duration-150 hover:bg-surface hover:text-fg focus-visible:bg-surface focus-visible:text-fg focus-visible:outline-none"
                >
                  {t(cv.labelKey)}
                  <Download aria-hidden="true" size={12} />
                </a>
              ))}
            </div>
          </div>
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          data-testid="nav-mobile-toggle"
          className="flex items-center justify-center border border-grid-border p-2 text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? t("menuClose") : t("menuOpen")}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label={t("start")}
          className="flex flex-col gap-4 border-t border-grid-border px-4 py-6 lg:hidden"
        >
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  navLinkClass,
                  active ? "text-accent cursor-default" : "text-muted",
                )}
                onClick={() => setMenuOpen(false)}
              >
                <BracketLabel>{t(item.key)}</BracketLabel>
              </Link>
            );
          })}
          <div className="flex flex-wrap items-center gap-5 pt-2">
            <a
              href={siteLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={t("linkedin")}
              className={socialIconLinkClass}
            >
              <LinkedinIcon />
            </a>
            <a
              href={siteLinks.github}
              target="_blank"
              rel="noreferrer"
              aria-label={t("github")}
              className={socialIconLinkClass}
            >
              <GithubIcon />
            </a>
            {cvLinks.map((cv) => (
              <a
                key={cv.href}
                href={cv.href}
                download
                className={externalLinkClass}
              >
                {t("cv")} ({t(cv.labelKey)})
                <Download aria-hidden="true" size={12} />
              </a>
            ))}
          </div>
          <LanguageSwitcher className="pt-2" />
        </nav>
      )}
    </header>
  );
}
