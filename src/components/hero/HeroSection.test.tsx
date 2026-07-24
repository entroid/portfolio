import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { HeroSection } from "./HeroSection";

describe("HeroSection", () => {
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

    const cta = screen.getByRole("link", { name: "Case Studies & Work" });
    expect(cta).toHaveAttribute("href", "/en/work");
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<HeroSection />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
