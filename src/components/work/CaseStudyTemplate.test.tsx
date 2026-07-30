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
    context: "An internal ops tool for an on-call team.",
  },
  content: <p>Process narrative goes here.</p>,
};

describe("CaseStudyTemplate", () => {
  it("renders the title as an h1", () => {
    renderWithIntl(<CaseStudyTemplate project={project} />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId("case-study-heading")).toBeInTheDocument();
  });

  it("renders role and context", () => {
    renderWithIntl(<CaseStudyTemplate project={project} />);
    expect(screen.getByTestId("case-study-role")).toBeInTheDocument();
    expect(screen.getByTestId("case-study-context")).toBeInTheDocument();
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
