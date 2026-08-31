import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { CaseStudyCard } from "./CaseStudyCard";

vi.mock("next/navigation", async (importActual) => ({
  ...(await importActual<typeof import("next/navigation")>()),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
}));

const project = {
  meta: {
    slug: "signal-desk",
    depth: "featured" as const,
    order: 1,
    coverImage: "/images/work/signal-desk/cover.png",
    coverImageAlt: "Signal Desk dashboard cover.",
    year: "2023",
    gallery: [],
  },
  frontmatter: {
    title: "Signal Desk — real-time ops dashboard",
    summary: "Turning a wall of raw logs into a trusted dashboard.",
    role: "Product Designer",
    results: [
      { value: "-30%", label: "incident response time" },
      { value: "3", label: "user roles defined upfront" },
    ],
  },
};

describe("CaseStudyCard", () => {
  it("links to the case study's route", () => {
    renderWithIntl(<CaseStudyCard project={project} />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/en/work/signal-desk",
    );
  });

  it("renders the title and summary", () => {
    renderWithIntl(<CaseStudyCard project={project} />);
    expect(screen.getByTestId("case-study-title")).toBeInTheDocument();
    expect(screen.getByTestId("case-study-summary")).toBeInTheDocument();
  });

  it("hides the bracket decoration from the accessibility tree", () => {
    renderWithIntl(<CaseStudyCard project={project} />);
    const link = screen.getByRole("link");
    const decorative = link.querySelectorAll('[aria-hidden="true"]');
    expect(decorative.length).toBeGreaterThanOrEqual(2);
  });

  it("puts the year and role on one line, and the headline metric on the cover", () => {
    renderWithIntl(<CaseStudyCard project={project} />);
    expect(screen.getByTestId("case-study-year")).toHaveTextContent(
      "2023 · Product Designer",
    );
    // Only the first result reaches the card.
    const chip = screen.getByTestId("case-study-card-result");
    expect(chip).toHaveTextContent("-30% incident response time");
    expect(chip).not.toHaveTextContent("user roles");
  });

  it("drops the cover chip for a project without results", () => {
    renderWithIntl(
      <CaseStudyCard
        project={{
          ...project,
          frontmatter: { ...project.frontmatter, results: undefined },
        }}
      />,
    );
    expect(
      screen.queryByTestId("case-study-card-result"),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("case-study-card-role")).toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<CaseStudyCard project={project} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
