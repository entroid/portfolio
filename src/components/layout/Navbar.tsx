"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Download, ExternalLink, Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { siteLinks } from "@/lib/site-links";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "/", key: "start" },
  { href: "/work", key: "work" },
  { href: "/ai-workflow", key: "aiWorkflow" },
  { href: "/contact", key: "contact" },
] as const;

const navLinkClass =
  "group inline-flex items-center font-mono text-label uppercase tracking-label transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const externalLinkClass =
  "inline-flex items-center gap-1 font-mono text-label uppercase tracking-label text-muted transition-colors duration-150 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-grid-border bg-bg/95 backdrop-blur">
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
          aria-label={t("start")}
          className="hidden items-center gap-6 md:flex"
        >
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(navLinkClass, active ? "text-accent" : "text-fg")}
              >
                <BracketLabel>{t(item.key)}</BracketLabel>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href={siteLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            className={externalLinkClass}
          >
            LinkedIn
            <ExternalLink aria-hidden="true" size={12} />
          </a>
          <a
            href={siteLinks.github}
            target="_blank"
            rel="noreferrer"
            className={externalLinkClass}
          >
            GitHub
            <ExternalLink aria-hidden="true" size={12} />
          </a>
          <a href={siteLinks.cvPath} download className={externalLinkClass}>
            {t("cv")}
            <Download aria-hidden="true" size={12} />
          </a>
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className="flex items-center justify-center border border-grid-border p-2 text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg md:hidden"
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
          className="flex flex-col gap-4 border-t border-grid-border px-4 py-6 md:hidden"
        >
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(navLinkClass, active ? "text-accent" : "text-fg")}
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
              className={externalLinkClass}
            >
              LinkedIn
              <ExternalLink aria-hidden="true" size={12} />
            </a>
            <a
              href={siteLinks.github}
              target="_blank"
              rel="noreferrer"
              className={externalLinkClass}
            >
              GitHub
              <ExternalLink aria-hidden="true" size={12} />
            </a>
            <a href={siteLinks.cvPath} download className={externalLinkClass}>
              {t("cv")}
              <Download aria-hidden="true" size={12} />
            </a>
          </div>
          <LanguageSwitcher className="pt-2" />
        </nav>
      )}
    </header>
  );
}
