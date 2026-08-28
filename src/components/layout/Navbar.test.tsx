import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { Navbar } from "./Navbar";
import { siteLinks } from "@/lib/site-links";

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

describe("Navbar", () => {
  it("renders the primary nav links as real routes, in order", () => {
    renderWithIntl(<Navbar />);
    const nav = screen.getByTestId("nav-desktop");
    const links = nav.querySelectorAll("a");
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", "/en/work");
    expect(links[1]).toHaveAttribute("href", "/en/ai-workflow");
    expect(links[2]).toHaveAttribute("href", "/en/contact");
  });

  it("exposes LinkedIn and GitHub links", () => {
    renderWithIntl(<Navbar />);
    expect(screen.getAllByTestId("nav-linkedin")[0]).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(screen.getAllByTestId("nav-github")[0]).toHaveAttribute(
      "target",
      "_blank",
    );
  });

  it("exposes an English/Spanish CV download menu", () => {
    renderWithIntl(<Navbar />);
    expect(screen.getAllByTestId("nav-cv-toggle")[0]).toBeInTheDocument();
    const englishCv = screen.getAllByTestId("nav-cv-cvEnglish")[0];
    expect(englishCv).toHaveAttribute("href", siteLinks.cvPathEn);
    expect(englishCv).toHaveAttribute("download");
    const spanishCv = screen.getAllByTestId("nav-cv-cvSpanish")[0];
    expect(spanishCv).toHaveAttribute("href", siteLinks.cvPathEs);
    expect(spanishCv).toHaveAttribute("download");
  });

  it("toggles the mobile menu via keyboard", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Navbar />);
    const toggle = screen.getByTestId("nav-mobile-toggle");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById("mobile-nav")).toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<Navbar />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
