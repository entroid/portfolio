import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WorkIndex } from "@/components/work/WorkIndex";

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
      year: "2023",
      gallery: [],
    },
    frontmatter: {
      title: "Signal Desk",
      summary: "A real-time ops dashboard.",
    },
  },
  {
    meta: {
      slug: "muu-livestock-app",
      depth: "other" as const,
      order: 1,
      coverImage: "/images/work/muu-livestock-app/cover.png",
      coverImageAlt: "Muu livestock marketplace cover.",
      year: "2022",
      gallery: [],
    },
    frontmatter: {
      title: "Muu",
      summary: "A livestock marketplace redesign.",
    },
  },
];

/**
 * Composes Navbar + page content + Footer the way the root layout does, so
 * axe can catch composition-level issues that isolated component tests
 * can't. The actual route (`src/app/[locale]/work/page.tsx`) is an async
 * Server Component reading `next-intl/server` APIs that don't resolve
 * under jsdom, so it isn't rendered directly.
 */
function renderWorkComposition() {
  return renderWithIntl(
    <>
      <Navbar />
      <main>
        <WorkIndex projects={projects} />
      </main>
      <Footer />
    </>,
  );
}

describe("Work index page composition", () => {
  it("has exactly one h1", () => {
    renderWorkComposition();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWorkComposition();
    expect(await axe(container)).toHaveNoViolations();
  });
});
