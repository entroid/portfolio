import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { OtherWorkTemplate } from "./OtherWorkTemplate";

const project = {
  meta: {
    slug: "lumen-crm",
    depth: "other" as const,
    order: 1,
    coverImage: "/images/work/lumen-crm/cover.png",
    coverImageAlt: "Lumen CRM pipeline board cover.",
    year: "2022",
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
    renderWithIntl(<OtherWorkTemplate project={project} />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId("case-study-heading")).toBeInTheDocument();
  });

  it("renders the enlarged cover image", () => {
    renderWithIntl(<OtherWorkTemplate project={project} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("does not render the role/responsibilities/context block when the project has none", () => {
    renderWithIntl(<OtherWorkTemplate project={project} />);
    expect(screen.queryByTestId("case-study-role")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("case-study-responsibilities"),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("case-study-context")).not.toBeInTheDocument();
  });

  it("renders only the detail fields an 'other' project supplies", () => {
    const projectWithRole = {
      ...project,
      frontmatter: { ...project.frontmatter, role: "Product Designer" },
    };
    renderWithIntl(<OtherWorkTemplate project={projectWithRole} />);
    expect(screen.getByTestId("case-study-role")).toHaveTextContent(
      "Product Designer",
    );
    expect(
      screen.queryByTestId("case-study-responsibilities"),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("case-study-context")).not.toBeInTheDocument();
  });

  it("renders the extended description body", () => {
    renderWithIntl(<OtherWorkTemplate project={project} />);
    expect(screen.getByTestId("other-work-content")).toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(
      <OtherWorkTemplate project={project} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
