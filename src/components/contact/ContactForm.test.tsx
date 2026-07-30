import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { renderWithIntl } from "@/test/renderWithIntl";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true } as Response));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("blocks submission and shows accessible errors when fields are empty", async () => {
    const user = userEvent.setup();
    renderWithIntl(<ContactForm />);

    await user.click(screen.getByTestId("contact-submit"));

    await waitFor(() =>
      expect(document.getElementById("contact-name-error")).toBeInTheDocument(),
    );
    const nameInput = screen.getByTestId("contact-name-input");
    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(nameInput).toHaveAttribute("aria-describedby", "contact-name-error");
    expect(document.getElementById("contact-email-error")).toBeInTheDocument();
    expect(
      document.getElementById("contact-message-error"),
    ).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("rejects an invalid email format", async () => {
    const user = userEvent.setup();
    renderWithIntl(<ContactForm />);

    await user.type(screen.getByTestId("contact-name-input"), "Ada Lovelace");
    await user.type(screen.getByTestId("contact-email-input"), "not-an-email");
    await user.type(screen.getByTestId("contact-message-input"), "Hello there");
    await user.click(screen.getByTestId("contact-submit"));

    await waitFor(() =>
      expect(screen.getByTestId("contact-email-input")).toHaveAttribute(
        "aria-invalid",
        "true",
      ),
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("submits to FormSubmit and shows a success state", async () => {
    const user = userEvent.setup();
    renderWithIntl(<ContactForm />);

    await user.type(screen.getByTestId("contact-name-input"), "Ada Lovelace");
    await user.type(
      screen.getByTestId("contact-email-input"),
      "ada@example.com",
    );
    await user.type(screen.getByTestId("contact-message-input"), "Hello there");
    await user.click(screen.getByTestId("contact-submit"));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  it("silently pretends success when the honeypot field is filled", async () => {
    const user = userEvent.setup();
    renderWithIntl(<ContactForm />);

    await user.type(screen.getByTestId("contact-name-input"), "Ada Lovelace");
    await user.type(
      screen.getByTestId("contact-email-input"),
      "ada@example.com",
    );
    await user.type(screen.getByTestId("contact-message-input"), "Hello there");
    await user.type(screen.getByTestId("contact-company-input"), "I am a bot");
    await user.click(screen.getByTestId("contact-submit"));

    expect(await screen.findByRole("status")).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("shows an accessible error state when the request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false } as Response),
    );
    const user = userEvent.setup();
    renderWithIntl(<ContactForm />);

    await user.type(screen.getByTestId("contact-name-input"), "Ada Lovelace");
    await user.type(
      screen.getByTestId("contact-email-input"),
      "ada@example.com",
    );
    await user.type(screen.getByTestId("contact-message-input"), "Hello there");
    await user.click(screen.getByTestId("contact-submit"));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithIntl(<ContactForm />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
