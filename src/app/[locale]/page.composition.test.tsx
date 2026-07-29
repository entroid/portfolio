import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";

// next-intl's useRouter wraps Next's App Router useRouter(), which throws
// outside a mounted <AppRouterContext> — not present in these unit tests.
vi.mock("next/navigation", async (importActual) => ({
  ...(await importActual<typeof import("next/navigation")>()),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
}));

/**
 * Composes Navbar + page content + Footer the way the root layout does
 * (`src/app/[locale]/layout.tsx`), so axe can catch composition-level
 * issues (duplicate landmarks, a broken heading outline across sections)
 * that isolated per-component tests can't see. The page itself isn't
 * rendered directly — it's an async Server Component reading
 * `next-intl/server` APIs that don't resolve under jsdom.
 */
function renderHomeComposition() {
  return renderWithIntl(
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
      </main>
      <Footer />
    </>,
  );
}

describe("Home page composition", () => {
  it("has exactly one h1 and a continuous heading outline", () => {
    renderHomeComposition();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 2, name: "Hey, I'm Hernán." }),
    ).toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderHomeComposition();
    expect(await axe(container)).toHaveNoViolations();
  }, 20000);
});
