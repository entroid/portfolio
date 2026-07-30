import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { AboutSection } from "./AboutSection";

describe("AboutSection", () => {
  it("renders the title as an h2 continuing the page outline", () => {
    renderWithIntl(<AboutSection />);

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("renders the bio paragraph", () => {
    renderWithIntl(<AboutSection />);

    expect(screen.getByTestId("about-bio")).toBeInTheDocument();
  });

  it("renders the skills mini-list", () => {
    renderWithIntl(<AboutSection />);

    const list = screen.getByTestId("about-skills");
    expect(list).toBeInTheDocument();
    expect(list.querySelectorAll("li").length).toBeGreaterThan(0);
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<AboutSection />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
