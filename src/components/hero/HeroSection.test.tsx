import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { HeroSection } from "./HeroSection";

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    media: "(prefers-reduced-motion: reduce)",
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  } as unknown as MediaQueryList);
}

describe("HeroSection", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the headline, subtext, and CTA as real text (no JS required)", () => {
    renderWithIntl(<HeroSection />);

    expect(
      screen.getByRole("heading", { level: 1, name: "DESIGN & BUILD" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Where design and code actually meet."),
    ).toBeInTheDocument();
  });

  it("CTA is a real route link to /work, not a scroll or no-op", () => {
    renderWithIntl(<HeroSection />);

    const cta = screen.getByRole("link", { name: "[ Case Studies & Work ]" });
    expect(cta).toHaveAttribute("href", "/en/work");
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<HeroSection />);
    expect(await axe(container)).toHaveNoViolations();
  }, 20000);
});
