import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteLinks } from "@/lib/site-links";
import { ContactForm } from "./ContactForm";

const directLinkClassName =
  "font-mono text-label uppercase tracking-label text-muted transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function ContactPage() {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");

  return (
    <Section>
      <Container className="max-w-[720px]">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="mt-4 text-h1 font-mono font-extrabold tracking-h1 text-fg md:text-h1-desktop">
          {t("title")}
        </h1>
        <p className="mt-6 text-body text-muted md:text-body-desktop">
          {t("intro")}
        </p>

        <div className="mt-12">
          <ContactForm />
        </div>

        <div className="mt-16 border-t border-grid-border pt-8">
          <h2 className="text-h3 font-mono font-extrabold tracking-h1 text-fg md:text-h3-desktop">
            {t("direct.title")}
          </h2>
          <nav
            aria-label={t("direct.title")}
            className="mt-6 flex flex-wrap items-center gap-6"
          >
            <a
              href={`mailto:${siteLinks.email}`}
              className={directLinkClassName}
            >
              {tFooter("email")}
            </a>
            <a
              href={siteLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className={directLinkClassName}
            >
              {tFooter("linkedin")}
            </a>
            <a
              href={siteLinks.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={directLinkClassName}
            >
              {tFooter("whatsapp")}
            </a>
          </nav>
        </div>
      </Container>
    </Section>
  );
}
