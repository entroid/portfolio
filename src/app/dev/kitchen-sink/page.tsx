import { Barcode } from "@/components/ui/Barcode";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Crosshair } from "@/components/ui/Crosshair";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Grain } from "@/components/ui/Grain";
import { GridOverlay } from "@/components/ui/GridOverlay";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Section } from "@/components/ui/Section";
import { WireframeIcon } from "@/components/ui/WireframeIcon";

export const metadata = {
  // Dev-only QA surface — kept out of search results alongside the
  // Disallow: /dev/ rule in robots.ts.
  robots: { index: false, follow: false },
};

/**
 * Throwaway visual QA route for every Phase 1 primitive, in place of
 * Storybook (see docs/ARCHITECTURE.md's "Why these were left out"). Not
 * linked from the persistent nav — safe to delete once real pages exist,
 * or keep behind an env flag.
 */
export default function KitchenSinkPage() {
  return (
    <main className="flex flex-col gap-16 py-16">
      <Container>
        <h1 className="text-h1 md:text-h1-desktop font-mono font-extrabold tracking-h1 text-fg">
          Kitchen Sink
        </h1>
        <p className="text-body md:text-body-desktop mt-2 max-w-prose font-sans text-muted">
          Every Phase 1 primitive, for manual visual QA against
          DESIGN_SYSTEM.md. Not part of the shipped site.
        </p>
      </Container>

      <Section className="!py-0">
        <Container className="flex flex-col gap-4">
          <h2 className="text-h3 font-mono font-bold text-fg">Eyebrow</h2>
          <Eyebrow>UX/UI Design · UI Development</Eyebrow>
        </Container>
      </Section>

      <Section className="!py-0">
        <Container className="flex flex-col gap-4">
          <h2 className="text-h3 font-mono font-bold text-fg">MonoLabel</h2>
          <div className="flex gap-6">
            <MonoLabel>N43.28 W72.01</MonoLabel>
            <MonoLabel>SIG-004</MonoLabel>
            <MonoLabel>2024 – 2026</MonoLabel>
          </div>
        </Container>
      </Section>

      <Section className="!py-0">
        <Container className="flex flex-col gap-4">
          <h2 className="text-h3 font-mono font-bold text-fg">
            Button — primary (tab to it to see the focus ring; hover/focus fills
            solid)
          </h2>
          <div className="flex gap-4">
            <Button variant="primary">Case Studies &amp; Work</Button>
            <Button variant="primary" href="/work">
              As a link
            </Button>
          </div>

          <h2 className="text-h3 mt-6 font-mono font-bold text-fg">
            Button — secondary (hover/focus wraps text in brackets)
          </h2>
          <div className="flex gap-4">
            <Button variant="secondary">work</Button>
            <Button variant="secondary" href="/contact">
              contact
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="!py-0">
        <Container className="flex flex-col gap-4">
          <h2 className="text-h3 font-mono font-bold text-fg">
            Decorative motifs (Crosshair, Barcode, WireframeIcon) — aria-hidden
          </h2>
          <div className="flex items-center gap-8">
            <Crosshair className="h-8 w-8" />
            <Barcode className="h-8" />
            <WireframeIcon className="h-10 w-10" />
          </div>
        </Container>
      </Section>

      <Section className="!py-0">
        <Container>
          <h2 className="text-h3 font-mono font-bold text-fg">
            GridOverlay + Grain (composited on a dark panel)
          </h2>
          <div className="relative mt-4 h-40 overflow-hidden border border-grid-border bg-bg">
            <GridOverlay />
            <Grain />
            <p className="relative font-mono text-eyebrow uppercase tracking-eyebrow text-muted p-4">
              Grid + grain overlaid here
            </p>
          </div>
        </Container>
      </Section>

      <Section className="!py-0">
        <Container className="flex flex-col gap-2">
          <h2 className="text-h3 font-mono font-bold text-fg">
            Type scale (mobile → desktop via md:)
          </h2>
          <p className="text-h1 md:text-h1-desktop font-mono font-extrabold tracking-h1 text-fg">
            H1
          </p>
          <p className="text-h2 md:text-h2-desktop font-mono font-bold text-fg">
            H2
          </p>
          <p className="text-h3 md:text-h3-desktop font-mono font-bold text-fg">
            H3
          </p>
          <p className="text-body md:text-body-desktop font-sans text-fg">
            Body copy — Inter, for prose.
          </p>
        </Container>
      </Section>
    </main>
  );
}
