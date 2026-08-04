import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { CaseStudyHeader } from "./CaseStudyHeader";

const project = {
  meta: {
    slug: "signal-desk",
    depth: "featured" as const,
    order: 1,
    coverImage: "/images/work/signal-desk/cover.png",
    coverImageAlt: "Signal Desk dashboard cover.",
    gallery: [],
  },
  frontmatter: {
    title: "Signal Desk — real-time ops dashboard",
    summary: "Turning raw logs into a trusted dashboard.",
    role: "Product designer & front-end engineer.",
    responsibilities: "UX/UI Design • Front-End Engineering",
    context: "An internal ops tool for an on-call team.",
  },
};

describe("CaseStudyHeader", () => {
  it("renders the title as an h1 and the summary", () => {
    renderWithIntl(<CaseStudyHeader project={project} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      project.frontmatter.title,
    );
    expect(screen.getByText(project.frontmatter.summary)).toBeInTheDocument();
  });

  it("renders the cover image", () => {
    renderWithIntl(<CaseStudyHeader project={project} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("renders role, responsibilities, and context when all are supplied", () => {
    renderWithIntl(<CaseStudyHeader project={project} />);
    expect(screen.getByTestId("case-study-role")).toHaveTextContent(
      project.frontmatter.role,
    );
    expect(screen.getByTestId("case-study-responsibilities")).toHaveTextContent(
      project.frontmatter.responsibilities,
    );
    expect(screen.getByTestId("case-study-context")).toHaveTextContent(
      project.frontmatter.context,
    );
  });

  it("renders only the fields a project supplies, omitting the rest", () => {
    renderWithIntl(
      <CaseStudyHeader
        project={{
          ...project,
          frontmatter: {
            title: project.frontmatter.title,
            summary: project.frontmatter.summary,
            role: "Solo Designer",
          },
        }}
      />,
    );
    expect(screen.getByTestId("case-study-role")).toHaveTextContent(
      "Solo Designer",
    );
    expect(
      screen.queryByTestId("case-study-responsibilities"),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("case-study-context")).not.toBeInTheDocument();
  });

  it("renders no detail block at all when the project has none", () => {
    renderWithIntl(
      <CaseStudyHeader
        project={{
          ...project,
          frontmatter: {
            title: project.frontmatter.title,
            summary: project.frontmatter.summary,
          },
        }}
      />,
    );
    expect(screen.queryByTestId("case-study-role")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("case-study-responsibilities"),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("case-study-context")).not.toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<CaseStudyHeader project={project} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
