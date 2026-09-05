import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { FeaturedWork } from "./FeaturedWork";

const projects = [
  {
    meta: {
      slug: "hardrock-marketing-planner",
      depth: "featured" as const,
      order: 1,
      coverImage: "/images/work/hardrock-marketing-planner/cover.webp",
      coverImageAlt: "Hard Rock Marketing Planner calendar view.",
      year: "2026",
      gallery: [],
    },
    frontmatter: {
      title: "Hard Rock — Marketing Planner",
      summary: "A structured planner for campaign creation.",
      role: "Design Engineer",
    },
  },
  {
    meta: {
      slug: "topbuild-license-tracker",
      depth: "featured" as const,
      order: 2,
      coverImage: "/images/work/topbuild-license-tracker/portada.webp",
      coverImageAlt: "TopBuild license tracker dashboard.",
      year: "2020",
      gallery: [],
    },
    frontmatter: {
      title: "TopBuild — License Tracker",
      summary: "Centralising hundreds of construction licenses.",
      role: "Lead UX/UI Designer",
    },
  },
];

describe("FeaturedWork", () => {
  it("renders a card per project", () => {
    renderWithIntl(<FeaturedWork projects={projects} />);
    expect(screen.getAllByTestId("case-study-title")).toHaveLength(2);
    expect(
      screen.getByText("Hard Rock — Marketing Planner"),
    ).toBeInTheDocument();
  });

  it("links through to the work index, locale-prefixed", () => {
    renderWithIntl(<FeaturedWork projects={projects} />);
    expect(screen.getByTestId("home-featured-all")).toHaveAttribute(
      "href",
      "/en/work",
    );
  });

  it("renders nothing when there are no projects", () => {
    const { container } = renderWithIntl(<FeaturedWork projects={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the Spanish heading under the es locale", () => {
    renderWithIntl(<FeaturedWork projects={projects} />, { locale: "es" });
    expect(
      screen.getByRole("heading", { name: "Trabajo seleccionado" }),
    ).toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<FeaturedWork projects={projects} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
