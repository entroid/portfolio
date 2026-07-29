import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AiWorkflowContent } from "./page";

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

/**
 * Composes Navbar + page content + Footer the way the root layout does, so
 * axe can catch composition-level issues across the callout and the
 * 7-step ordered list — not just the isolated `AiWorkflowContent` render
 * covered in page.test.tsx. The default page export can't be rendered
 * directly (async Server Component reading `next-intl/server` APIs that
 * don't resolve under jsdom).
 */
function renderAiWorkflowComposition() {
  return renderWithIntl(
    <>
      <Navbar />
      <main>
        <AiWorkflowContent />
      </main>
      <Footer />
    </>,
  );
}

describe("AI Workflow page composition", () => {
  it("has exactly one h1 and a continuous heading outline", () => {
    renderAiWorkflowComposition();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "How does this fit into a team?",
      }),
    ).toBeInTheDocument();
  });

  it("renders the seven steps as a real ordered list within the full composition", () => {
    renderAiWorkflowComposition();
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(list.children).toHaveLength(7);
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderAiWorkflowComposition();
    expect(await axe(container)).toHaveNoViolations();
  });
});
