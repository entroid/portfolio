import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonClassName } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { GridOverlay } from "@/components/ui/GridOverlay";
import { Grain } from "@/components/ui/Grain";
import { cn } from "@/lib/cn";
import { HeroBackgroundVideo } from "./HeroBackgroundVideo";

// import { HeroSphere } from "./HeroSphere";

/**
 * Headline/subtext/CTA are plain server-rendered text — visible and
 * readable before the WebGL sphere's client bundle even starts loading,
 * per DESIGN_SYSTEM.md's "Hero: wireframe sphere" progressive-enhancement
 * requirement.
 */
export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[100vh] flex items-center py-24 md:py-0 md:pb-7 "
    >
      <Grain />
      <HeroBackgroundVideo />
      <GridOverlay className="opacity-80 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 md:px-8">
        <div className="relative md:min-h-[420px]">
          <div className="relative z-10 md:max-w-[65%]">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h1
              data-testid="hero-headline"
              className="mt-4 text-hero font-mono font-extrabold tracking-h1 text-fg md:text-hero-desktop leading-hero [-webkit-text-stroke:1px_var(--color-bg)]"
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

          {/*<div className="relative z-0 mx-auto mt-12 aspect-square w-full max-w-[420px] overflow-hidden border-2 border-accent-2 bg-[color:var(--color-surface)] [border-radius:0_30%_0] md:absolute md:top-1/2 md:right-0 md:mx-0 md:mt-0 md:w-1/2 md:max-w-[480px] md:-translate-y-1/2">
             
             <Image
              src="/images/profile2.webp"
              alt="Hernán Ainsa"
              fill
              sizes="(min-width: 768px) 480px, 420px"
              className="object-cover"
              priority
            /> 
            
            <MonoLabel className="absolute top-0 left-0">
              N43.28 W72.01
            </MonoLabel>
            <MonoLabel className="absolute right-0 bottom-0">SIG-004</MonoLabel>
          </div>*/}

          <div className="relative z-0 mx-auto mt-12 aspect-square w-full max-w-[600px] overflow-hidden  bg-[color:var(--color-surface)] md:absolute md:top-1/2 md:right-0 md:mx-0 md:mt-0 md:w-1/2 md:max-w-[600px] md:-translate-y-1/2">
            {/* Deliberate exception to DESIGN_SYSTEM.md's zero-radius rule, per Hernán. */}
            {/* HeroSphere is temporarily disabled above. */}
            <video
              src="/vids/Designer-to-Handoff.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <MonoLabel className="absolute top-0 left-0">
              S32.94 W60.65
            </MonoLabel>
            <MonoLabel className="absolute right-0 bottom-0">SIG-004</MonoLabel>
          </div>
        </div>
      </div>
    </section>
  );
}
