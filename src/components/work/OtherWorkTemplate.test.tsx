import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { OtherWorkTemplate } from "./OtherWorkTemplate";

const project = {
  meta: {
    slug: "lumen-crm",
    depth: "other" as const,
    order: 1,
    coverImage: "/images/work/lumen-crm/cover.png",
    coverImageAlt: "Lumen CRM pipeline board cover.",
    gallery: [],
  },
  frontmatter: {
    title: "Lumen CRM — pipeline view redesign",
    summary: "A lighter pass on a sales CRM's pipeline view.",
  },
  content: <p>Extended description goes here.</p>,
};

describe("OtherWorkTemplate", () => {
  it("renders the title as an h1", () => {
    render(<OtherWorkTemplate project={project} />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Lumen CRM — pipeline view redesign",
      }),
    ).toBeInTheDocument();
  });

  it("renders the enlarged cover image with real alt text", () => {
    render(<OtherWorkTemplate project={project} />);
    expect(
      screen.getByAltText("Lumen CRM pipeline board cover."),
    ).toBeInTheDocument();
  });

  it("renders the extended description body", () => {
    render(<OtherWorkTemplate project={project} />);
    expect(
      screen.getByText("Extended description goes here."),
    ).toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(<OtherWorkTemplate project={project} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
