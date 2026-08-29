import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { Reveal } from "@/components/ui/Reveal";
import { siteLinks } from "@/lib/site-links";
import { ContactForm } from "./ContactForm";
import { GridOverlay } from "@/components/ui/GridOverlay";

const directLinkClassName =
  "group inline-flex items-center font-mono text-body uppercase tracking-label transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function ContactPage() {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const cvPath = locale === "es" ? siteLinks.cvPathEs : siteLinks.cvPathEn;

  return (
    <Section id="contact">
      <Container className="max-w-[720px]">
        <GridOverlay className="opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        <h1 className="text-h1 font-mono font-extrabold tracking-h1 text-fg md:text-h1-desktop">
          {t("title")}
        </h1>
        <p className="mt-5 text-body text-muted md:text-body-desktop">
          {t("intro")}
        </p>

        <Reveal className="mt-8" delay={0.1}>
          <nav
            aria-label={t("direct.title")}
            className="flex flex-wrap items-center gap-6"
          >
            <a
              href={`mailto:${siteLinks.email}`}
              data-testid="contact-direct-email"
              className={directLinkClassName}
            >
              <BracketLabel>{tFooter("email")}</BracketLabel>
            </a>
            <a
              href={siteLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              data-testid="contact-direct-linkedin"
              className={directLinkClassName}
            >
              <BracketLabel>{tFooter("linkedin")}</BracketLabel>
            </a>
            <a
              href={siteLinks.whatsapp}
              target="_blank"
              rel="noreferrer"
              data-testid="contact-direct-whatsapp"
              className={directLinkClassName}
            >
              <BracketLabel>{tFooter("whatsapp")}</BracketLabel>
            </a>
            {/* Serves the CV in whichever language the page is being read in. */}
            <a
              href={cvPath}
              download
              data-testid="contact-direct-cv"
              className={directLinkClassName}
            >
              <BracketLabel>{tNav("cv")}</BracketLabel>
            </a>
          </nav>
        </Reveal>

        <Reveal className="mt-6 border-t border-grid-border pt-6">
          <ContactForm />
        </Reveal>
      </Container>
    </Section>
  );
}
