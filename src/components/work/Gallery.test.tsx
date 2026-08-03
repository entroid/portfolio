import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { Gallery } from "./Gallery";

describe("Gallery", () => {
  it("renders nothing when there are no images", () => {
    const { container } = render(<Gallery images={[]} title="Gallery" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders every image", () => {
    renderWithIntl(
      <Gallery
        images={[
          { src: "/a.png", alt: "Alpha screen" },
          { src: "/b.png", alt: "Beta screen" },
        ]}
        title="Gallery"
      />,
    );
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  it("renders the section title as a heading", () => {
    renderWithIntl(
      <Gallery images={[{ src: "/a.png", alt: "Alpha" }]} title="Gallery" />,
    );
    expect(screen.getByTestId("gallery-heading")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(
      <Gallery images={[{ src: "/a.png", alt: "Alpha" }]} title="Gallery" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
