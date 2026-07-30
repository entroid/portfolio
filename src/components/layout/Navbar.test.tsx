import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { Navbar } from "./Navbar";

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
    const nav = screen.getAllByRole("navigation", { name: "Start" })[0];
    const links = nav.querySelectorAll("a");
    // Decorative `[`/`]` bracket spans (the shared hover/focus
    // microinteraction) sit in textContent even though they're
    // aria-hidden — strip them before comparing labels.
    expect(
      Array.from(links).map((link) => link.textContent?.replace(/[[\]]/g, "")),
    ).toEqual(["Work", "AI Workflow", "Contact"]);
    expect(links[0]).toHaveAttribute("href", "/en/work");
    expect(links[1]).toHaveAttribute("href", "/en/ai-workflow");
    expect(links[2]).toHaveAttribute("href", "/en/contact");
  });

  it("exposes LinkedIn and GitHub links", () => {
    renderWithIntl(<Navbar />);
    expect(
      screen.getAllByRole("link", { name: /linkedin/i })[0],
    ).toHaveAttribute("target", "_blank");
    expect(screen.getAllByRole("link", { name: /github/i })[0]).toHaveAttribute(
      "target",
      "_blank",
    );
  });

  it("exposes an English/Spanish CV download menu", () => {
    renderWithIntl(<Navbar />);
    expect(
      screen.getAllByRole("button", { name: /^cv$/i })[0],
    ).toBeInTheDocument();
    const englishCv = screen.getAllByRole("menuitem", { name: /english/i })[0];
    expect(englishCv).toHaveAttribute("href", "/cv/hernan-ainsa-cv.pdf");
    expect(englishCv).toHaveAttribute("download");
    const spanishCv = screen.getAllByRole("menuitem", { name: /spanish/i })[0];
    expect(spanishCv).toHaveAttribute("href", "/cv/hernan-ainsa-cv-es.pdf");
    expect(spanishCv).toHaveAttribute("download");
  });

  it("toggles the mobile menu via keyboard", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Navbar />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    await user.click(toggle);
    expect(
      screen.getByRole("button", { name: /close menu/i }),
    ).toBeInTheDocument();
    expect(document.getElementById("mobile-nav")).toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<Navbar />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
