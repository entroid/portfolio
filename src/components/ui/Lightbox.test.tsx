import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { Lightbox } from "./Lightbox";

describe("Lightbox", () => {
  it("does not render the modal until the trigger is clicked", () => {
    renderWithIntl(<Lightbox src="/a.png" alt="Alpha screen" />);
    expect(screen.queryByTestId("lightbox-modal")).not.toBeInTheDocument();
  });

  it("opens the modal with the full-size image on click", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Lightbox src="/a.png" alt="Alpha screen" />);

    await user.click(screen.getByTestId("lightbox-trigger"));

    expect(screen.getByTestId("lightbox-modal")).toBeInTheDocument();
    expect(
      screen.getByRole("dialog", { name: "Alpha screen" }),
    ).toBeInTheDocument();
  });

  it("shows a caption with the alt text while the modal is open", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Lightbox src="/a.png" alt="Alpha screen" />);

    await user.click(screen.getByTestId("lightbox-trigger"));

    expect(screen.getByTestId("lightbox-caption")).toHaveTextContent(
      "Alpha screen",
    );
  });

  it("closes the modal via the close button", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Lightbox src="/a.png" alt="Alpha screen" />);

    await user.click(screen.getByTestId("lightbox-trigger"));
    await user.click(screen.getByTestId("lightbox-close"));

    expect(screen.queryByTestId("lightbox-modal")).not.toBeInTheDocument();
  });

  it("closes the modal on Escape", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Lightbox src="/a.png" alt="Alpha screen" />);

    await user.click(screen.getByTestId("lightbox-trigger"));
    await user.keyboard("{Escape}");

    expect(screen.queryByTestId("lightbox-modal")).not.toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(
      <Lightbox src="/a.png" alt="Alpha screen" />,
    );
    await userEvent.setup().click(screen.getByTestId("lightbox-trigger"));
    expect(await axe(container.ownerDocument.body)).toHaveNoViolations();
  });
});
