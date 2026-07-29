import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CaseStudyTemplate } from "@/components/work/CaseStudyTemplate";
import { OtherWorkTemplate } from "@/components/work/OtherWorkTemplate";

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

const featuredProject = {
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

const otherProject = {
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

/**
 * Composes Navbar + page content + Footer the way the root layout does, so
 * axe can catch composition-level issues that isolated component tests
 * can't. The actual route (`src/app/[locale]/work/[slug]/page.tsx`) is an
 * async Server Component reading `next-intl/server` APIs that don't
 * resolve under jsdom, so it isn't rendered directly — both the
 * `CaseStudyTemplate` ("featured") and `OtherWorkTemplate` ("other")
 * branches it picks between are covered here instead.
 */
function renderCaseStudyComposition() {
  return renderWithIntl(
    <>
      <Navbar />
      <main>
        <CaseStudyTemplate project={featuredProject} />
      </main>
      <Footer />
    </>,
  );
}

function renderOtherWorkComposition() {
  return renderWithIntl(
    <>
      <Navbar />
      <main>
        <OtherWorkTemplate project={otherProject} />
      </main>
      <Footer />
    </>,
  );
}

describe("Case study page composition (featured)", () => {
  it("has exactly one h1", () => {
    renderCaseStudyComposition();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderCaseStudyComposition();
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Case study page composition (other work)", () => {
  it("has exactly one h1", () => {
    renderOtherWorkComposition();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderOtherWorkComposition();
    expect(await axe(container)).toHaveNoViolations();
  });
});
