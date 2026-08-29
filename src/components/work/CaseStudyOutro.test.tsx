import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { CaseStudyOutro } from "./CaseStudyOutro";

const nextProject = {
  meta: {
    slug: "topbuild-license-tracker",
    depth: "featured" as const,
    order: 2,
    coverImage: "/images/work/topbuild-license-tracker/portada.webp",
    coverImageAlt: "TopBuild license tracker cover.",
    year: "2020",
    gallery: [],
  },
  frontmatter: {
    title: "TopBuild — License Tracker",
    summary: "Centralising hundreds of construction licenses.",
  },
};

describe("CaseStudyOutro", () => {
  it("links to the contact page, locale-prefixed", () => {
    renderWithIntl(<CaseStudyOutro nextProject={nextProject} />);
    expect(screen.getByTestId("case-study-outro-cta")).toHaveAttribute(
      "href",
      "/en/contact",
    );
  });

  it("links to the next project by title", () => {
    renderWithIntl(<CaseStudyOutro nextProject={nextProject} />);
    const link = screen.getByTestId("case-study-next");
    expect(link).toHaveAttribute("href", "/en/work/topbuild-license-tracker");
    expect(link).toHaveTextContent("TopBuild — License Tracker");
  });

  it("still renders the contact CTA when there is no next project", () => {
    renderWithIntl(<CaseStudyOutro nextProject={null} />);
    expect(screen.getByTestId("case-study-outro-cta")).toBeInTheDocument();
    expect(screen.queryByTestId("case-study-next")).not.toBeInTheDocument();
  });

  it("renders the Spanish copy under the es locale", () => {
    renderWithIntl(<CaseStudyOutro nextProject={nextProject} />, {
      locale: "es",
    });
    expect(screen.getByText("¿Querés que lo charlemos?")).toBeInTheDocument();
    expect(screen.getByTestId("case-study-next")).toHaveTextContent(
      "Siguiente caso",
    );
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(
      <CaseStudyOutro nextProject={nextProject} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
