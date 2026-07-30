import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { Reveal } from "@/components/ui/Reveal";
import { siteLinks } from "@/lib/site-links";
import { ContactForm } from "./ContactForm";
import { GridOverlay } from "@/components/ui/GridOverlay";

const directLinkClassName =
  "group inline-flex items-center font-mono text-label uppercase tracking-label text-muted transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function ContactPage() {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");

  return (
    <Section id="contact">
      <Container className="max-w-[720px]">
        <GridOverlay className="opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        <h1 className="mt-4 text-h1 font-mono font-extrabold tracking-h1 text-fg md:text-h1-desktop">
          {t("title")}
        </h1>
        <p className="mt-6 text-body text-muted md:text-body-desktop">
          {t("intro")}
        </p>

        <Reveal className="mt-12">
          <ContactForm />
        </Reveal>

        <Reveal className="mt-16 border-t border-grid-border pt-8" delay={0.1}>
          <h2 className="text-h3 font-mono font-extrabold tracking-h1 text-fg md:text-h3-desktop">
            {t("direct.title")}
          </h2>
          <nav
            aria-label={t("direct.title")}
            className="mt-6 flex flex-wrap items-center gap-6"
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
          </nav>
        </Reveal>
      </Container>
    </Section>
  );
}
