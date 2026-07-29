import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactPage } from "@/components/contact/ContactPage";

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
 * Composes Navbar + page content + Footer the way the root layout does, so
 * axe can catch composition-level issues (e.g. duplicate "Email"/
 * "LinkedIn" links between the page body and the footer) that isolated
 * component tests can't. The actual route
 * (`src/app/[locale]/contact/page.tsx`) is an async Server Component
 * reading `next-intl/server` APIs that don't resolve under jsdom, so it
 * isn't rendered directly.
 */
function renderContactComposition() {
  return renderWithIntl(
    <>
      <Navbar />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </>,
  );
}

describe("Contact page composition", () => {
  it("has exactly one h1", () => {
    renderContactComposition();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderContactComposition();
    expect(await axe(container)).toHaveNoViolations();
  });
});
