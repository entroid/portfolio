import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonClassName } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { GridOverlay } from "@/components/ui/GridOverlay";
import { Grain } from "@/components/ui/Grain";
import { cn } from "@/lib/cn";
import { HeroSphere } from "./HeroSphere";
import { HeroBackgroundVideo } from "./HeroBackgroundVideo";

/**
 * Headline/subtext/CTA are plain server-rendered text — visible and
 * readable before the WebGL sphere's client bundle even starts loading,
 * per DESIGN_SYSTEM.md's "Hero: wireframe sphere" progressive-enhancement
 * requirement.
 */
export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section id="hero" className="relative overflow-hidden py-24 md:py-32">
      <Grain />
      <HeroBackgroundVideo />
      <GridOverlay className="opacity-30" color2="rgba(255, 255, 255, 0.86)" />

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-12 px-4 md:grid-cols-2 md:px-8">
        <div>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1
            data-testid="hero-headline"
            className="mt-4 text-h1 font-mono font-extrabold tracking-h1 text-fg md:text-h1-desktop"
          >
            {t("headline")}
          </h1>
          <p
            data-testid="hero-subtext"
            className="mt-6 max-w-md text-body text-muted md:text-body-desktop"
          >
            {t("subtext")}
          </p>
          <Link
            href="/work"
            data-testid="hero-cta"
            className={cn(
              buttonClassName.primary,
              "mt-8 inline-flex text-cta-main",
            )}
          >
            {t("cta")}
          </Link>
        </div>

        <div className="relative aspect-square w-full max-w-[420px] justify-self-center">
          <HeroSphere />
          <MonoLabel className="absolute top-0 left-0">N43.28 W72.01</MonoLabel>
          <MonoLabel className="absolute right-0 bottom-0">SIG-004</MonoLabel>
        </div>
      </div>
    </section>
  );
}
