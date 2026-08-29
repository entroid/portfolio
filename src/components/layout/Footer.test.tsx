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

  it("states location, working hours and availability", () => {
    renderWithIntl(<Footer />);
    expect(screen.getByTestId("footer-status")).toHaveTextContent(
      "Rosario, Argentina",
    );
  });

  it("links to GitHub and to the CV for the active locale", () => {
    renderWithIntl(<Footer />);
    expect(screen.getByTestId("footer-github")).toHaveAttribute(
      "href",
      siteLinks.github,
    );
    expect(screen.getByTestId("footer-cv")).toHaveAttribute(
      "href",
      siteLinks.cvPathEn,
    );
  });

  it("serves the Spanish CV under the es locale", () => {
    renderWithIntl(<Footer />, { locale: "es" });
    expect(screen.getByTestId("footer-cv")).toHaveAttribute(
      "href",
      siteLinks.cvPathEs,
    );
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<Footer />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
