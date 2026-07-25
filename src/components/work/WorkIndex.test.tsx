import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { WorkIndex } from "./WorkIndex";

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

const projects = [
  {
    meta: {
      slug: "signal-desk",
      depth: "featured" as const,
      order: 1,
      coverImage: "/images/work/signal-desk/cover.png",
      coverImageAlt: "Signal Desk dashboard cover.",
      gallery: [],
    },
    frontmatter: {
      title: "Signal Desk",
      summary: "A real-time ops dashboard.",
    },
  },
  {
    meta: {
      slug: "lumen-crm",
      depth: "other" as const,
      order: 1,
      coverImage: "/images/work/lumen-crm/cover.png",
      coverImageAlt: "Lumen CRM pipeline board cover.",
      gallery: [],
    },
    frontmatter: {
      title: "Lumen CRM",
      summary: "A pipeline view redesign.",
    },
  },
];

describe("WorkIndex", () => {
  it("renders the page title as an h1", () => {
    renderWithIntl(<WorkIndex projects={projects} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Case Studies & Work" }),
    ).toBeInTheDocument();
  });

  it("groups featured projects under their own heading", () => {
    renderWithIntl(<WorkIndex projects={projects} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Featured Case Studies" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Signal Desk")).toBeInTheDocument();
  });

  it("groups other work under its own heading", () => {
    renderWithIntl(<WorkIndex projects={projects} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Other Work" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Lumen CRM")).toBeInTheDocument();
  });

  it("omits the other-work heading entirely when there is none", () => {
    renderWithIntl(<WorkIndex projects={[projects[0]]} />);
    expect(
      screen.queryByRole("heading", { level: 2, name: "Other Work" }),
    ).not.toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<WorkIndex projects={projects} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
