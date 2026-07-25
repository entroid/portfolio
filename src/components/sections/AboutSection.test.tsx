import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { AboutSection } from "./AboutSection";

describe("AboutSection", () => {
  it("renders the title as an h2 continuing the page outline", () => {
    renderWithIntl(<AboutSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Hey, I'm Hernán." }),
    ).toBeInTheDocument();
  });

  it("renders the bio paragraph", () => {
    renderWithIntl(<AboutSection />);

    expect(
      screen.getByText(/Half designer, half developer/),
    ).toBeInTheDocument();
  });

  it("renders the skills mini-list", () => {
    renderWithIntl(<AboutSection />);

    expect(screen.getByText("UX/UI Design")).toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<AboutSection />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
