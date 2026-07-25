import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { siteLinks } from "@/lib/site-links";
import { ContactPage } from "./ContactPage";

describe("ContactPage", () => {
  it("renders the heading, the form, and direct links from site-links.ts", () => {
    renderWithIntl(<ContactPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Let's talk." }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();

    const emailLinks = screen.getAllByRole("link", { name: "Email" });
    expect(emailLinks[0]).toHaveAttribute("href", `mailto:${siteLinks.email}`);
    expect(
      screen.getAllByRole("link", { name: "LinkedIn" })[0],
    ).toHaveAttribute("href", siteLinks.linkedin);
    expect(
      screen.getAllByRole("link", { name: "WhatsApp" })[0],
    ).toHaveAttribute("href", siteLinks.whatsapp);
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<ContactPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
