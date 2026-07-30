import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { siteLinks } from "@/lib/site-links";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders email, LinkedIn, and WhatsApp links from site-links.ts", () => {
    renderWithIntl(<Footer />);
    expect(screen.getByTestId("footer-email")).toHaveAttribute(
      "href",
      `mailto:${siteLinks.email}`,
    );
    expect(screen.getByTestId("footer-linkedin")).toHaveAttribute(
      "href",
      siteLinks.linkedin,
    );
    expect(screen.getByTestId("footer-whatsapp")).toHaveAttribute(
      "href",
      siteLinks.whatsapp,
    );
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<Footer />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
