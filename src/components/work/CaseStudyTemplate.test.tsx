import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { CaseStudyTemplate } from "./CaseStudyTemplate";

const project = {
  meta: {
    slug: "signal-desk",
    depth: "featured" as const,
    order: 1,
    coverImage: "/images/work/signal-desk/cover.png",
    coverImageAlt: "Signal Desk dashboard cover.",
    gallery: [
      { src: "/images/work/signal-desk/gallery-1.png", alt: "Gallery shot." },
    ],
  },
  frontmatter: {
    title: "Signal Desk — real-time ops dashboard",
    summary: "Turning raw logs into a trusted dashboard.",
    role: "Product designer & front-end engineer.",
    responsibilities: "UX/UI Design • Front-End Engineering",
    context: "An internal ops tool for an on-call team.",
    results: [{ value: "-30%", label: "incident response time" }],
    resultsNote: "* Estimated impact based on before/after incident logs.",
  },
  content: <p>Process narrative goes here.</p>,
};

describe("CaseStudyTemplate", () => {
  it("renders the title as an h1", () => {
    renderWithIntl(<CaseStudyTemplate project={project} />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId("case-study-heading")).toBeInTheDocument();
  });

  it("renders role, responsibilities, and context", () => {
    renderWithIntl(<CaseStudyTemplate project={project} />);
    expect(screen.getByTestId("case-study-role")).toBeInTheDocument();
    expect(
      screen.getByTestId("case-study-responsibilities"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("case-study-context")).toBeInTheDocument();
  });

  it("omits the responsibilities block when the project has none", () => {
    renderWithIntl(
      <CaseStudyTemplate
        project={{
          ...project,
          frontmatter: { ...project.frontmatter, responsibilities: undefined },
        }}
      />,
    );
    expect(
      screen.queryByTestId("case-study-responsibilities"),
    ).not.toBeInTheDocument();
  });

  it("renders the results footnote when the project supplies one", () => {
    renderWithIntl(<CaseStudyTemplate project={project} />);
    expect(screen.getByTestId("case-study-results-note")).toHaveTextContent(
      project.frontmatter.resultsNote,
    );
  });

  it("omits the results footnote when the project has none", () => {
    renderWithIntl(
      <CaseStudyTemplate
        project={{
          ...project,
          frontmatter: { ...project.frontmatter, resultsNote: undefined },
        }}
      />,
    );
    expect(
      screen.queryByTestId("case-study-results-note"),
    ).not.toBeInTheDocument();
  });

  it("renders the MDX body content", () => {
    renderWithIntl(<CaseStudyTemplate project={project} />);
    expect(screen.getByTestId("case-study-content")).toBeInTheDocument();
  });

  it("renders the trailing gallery when the project has one", () => {
    renderWithIntl(<CaseStudyTemplate project={project} />);
    expect(screen.getAllByRole("img").length).toBeGreaterThan(0);
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(
      <CaseStudyTemplate project={project} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
