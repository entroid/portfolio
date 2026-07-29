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
    ).toEqual(["Start", "Work", "AI Workflow", "Contact"]);
    expect(links[0]).toHaveAttribute("href", "/en");
    expect(links[1]).toHaveAttribute("href", "/en/work");
    expect(links[2]).toHaveAttribute("href", "/en/ai-workflow");
    expect(links[3]).toHaveAttribute("href", "/en/contact");
  });

  it("exposes LinkedIn, GitHub, and CV download links", () => {
    renderWithIntl(<Navbar />);
    expect(
      screen.getAllByRole("link", { name: /linkedin/i })[0],
    ).toHaveAttribute("target", "_blank");
    expect(screen.getAllByRole("link", { name: /github/i })[0]).toHaveAttribute(
      "target",
      "_blank",
    );
    const cvLink = screen.getAllByRole("link", { name: /cv/i })[0];
    expect(cvLink).toHaveAttribute("href", "/cv/hernan-ainsa-cv.pdf");
    expect(cvLink).toHaveAttribute("download");
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
