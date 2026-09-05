import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { Gallery } from "./Gallery";

const threeImages = [
  { src: "/a.png", alt: "Alpha screen" },
  { src: "/b.png", alt: "Beta screen" },
  { src: "/c.png", alt: "Gamma screen" },
];

describe("Gallery", () => {
  it("renders nothing when there are no images", () => {
    const { container } = renderWithIntl(
      <Gallery images={[]} title="Gallery" />,
    );
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

  it("opens the clicked image full screen, with its position in the set", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Gallery images={threeImages} title="Gallery" />);

    await user.click(screen.getAllByTestId("gallery-thumb")[1]);

    expect(screen.getByTestId("lightbox-caption")).toHaveTextContent(
      "Beta screen",
    );
    expect(screen.getByTestId("lightbox-position")).toHaveTextContent("2 / 3");
  });

  it("steps through the set with the arrow keys, wrapping at both ends", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Gallery images={threeImages} title="Gallery" />);

    await user.click(screen.getAllByTestId("gallery-thumb")[0]);
    const caption = () => screen.getByTestId("lightbox-caption");

    await user.keyboard("{ArrowRight}");
    expect(caption()).toHaveTextContent("Beta screen");

    await user.keyboard("{ArrowLeft}");
    expect(caption()).toHaveTextContent("Alpha screen");

    // Left from the first image wraps round to the last.
    await user.keyboard("{ArrowLeft}");
    expect(caption()).toHaveTextContent("Gamma screen");

    await user.keyboard("{ArrowRight}");
    expect(caption()).toHaveTextContent("Alpha screen");
  });

  it("steps with the on-screen arrows too", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Gallery images={threeImages} title="Gallery" />);

    await user.click(screen.getAllByTestId("gallery-thumb")[0]);
    await user.click(screen.getByTestId("lightbox-next"));

    expect(screen.getByTestId("lightbox-caption")).toHaveTextContent(
      "Beta screen",
    );
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Gallery images={threeImages} title="Gallery" />);

    await user.click(screen.getAllByTestId("gallery-thumb")[0]);
    await user.keyboard("{Escape}");

    expect(screen.queryByTestId("lightbox-modal")).not.toBeInTheDocument();
  });

  it("offers no stepping controls for a single image", async () => {
    const user = userEvent.setup();
    renderWithIntl(
      <Gallery images={[{ src: "/a.png", alt: "Alpha" }]} title="Gallery" />,
    );

    await user.click(screen.getByTestId("gallery-thumb"));

    expect(screen.queryByTestId("lightbox-prev")).not.toBeInTheDocument();
    expect(screen.queryByTestId("lightbox-next")).not.toBeInTheDocument();
    expect(screen.queryByTestId("lightbox-position")).not.toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(
      <Gallery images={[{ src: "/a.png", alt: "Alpha" }]} title="Gallery" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
