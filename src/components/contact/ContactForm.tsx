"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { buttonClassName } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const formSubmitEmail = process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL;

const inputClassName =
  "w-full border border-field-border bg-field px-4 py-3 text-body text-fg transition-colors duration-150 placeholder:text-muted hover:border-white/25 focus:border-accent focus:outline-none";

const labelClassName =
  "font-mono text-label uppercase tracking-label text-muted md:text-label-desktop";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");

  const schema = z.object({
    name: z.string().trim().min(1, t("errors.nameRequired")),
    email: z
      .string()
      .trim()
      .min(1, t("errors.emailRequired"))
      .email(t("errors.emailInvalid")),
    message: z.string().trim().min(1, t("errors.messageRequired")),
    company: z.string().optional(),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    // Live validation so the submit button can reflect whether the form is
    // actually sendable. Errors are shown per field only once that field has
    // been typed in, so the page doesn't open covered in red.
    mode: "onChange",
  });

  const showError = {
    name: Boolean(errors.name && dirtyFields.name),
    email: Boolean(errors.email && dirtyFields.email),
    message: Boolean(errors.message && dirtyFields.message),
  };

  async function onSubmit(values: FormValues) {
    if (values.company) {
      // Honeypot tripped — pretend success without sending anything.
      setStatus("success");
      reset();
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${formSubmitEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            message: values.message,
            _subject: "New message from portfolio contact form",
          }),
        },
      );

      if (!response.ok) {
        throw new Error("FormSubmit request failed");
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div id="contact-form">
      <form
        noValidate
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}
        className="flex flex-col gap-6"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className={labelClassName}>
              {t("name")}
            </label>
            <input
              id="contact-name"
              data-testid="contact-name-input"
              type="text"
              autoComplete="name"
              className={inputClassName}
              aria-invalid={showError.name ? "true" : "false"}
              aria-describedby={
                showError.name ? "contact-name-error" : undefined
              }
              {...register("name")}
            />
            {showError.name && (
              <p
                id="contact-name-error"
                role="alert"
                className="text-label text-accent"
              >
                {errors.name?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className={labelClassName}>
              {t("email")}
            </label>
            <input
              id="contact-email"
              data-testid="contact-email-input"
              type="email"
              autoComplete="email"
              className={inputClassName}
              aria-invalid={showError.email ? "true" : "false"}
              aria-describedby={
                showError.email ? "contact-email-error" : undefined
              }
              {...register("email")}
            />
            {showError.email && (
              <p
                id="contact-email-error"
                role="alert"
                className="text-label text-accent"
              >
                {errors.email?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className={labelClassName}>
            {t("message")}
          </label>
          <textarea
            id="contact-message"
            data-testid="contact-message-input"
            rows={5}
            className={inputClassName}
            aria-invalid={showError.message ? "true" : "false"}
            aria-describedby={
              showError.message ? "contact-message-error" : undefined
            }
            {...register("message")}
          />
          {showError.message && (
            <p
              id="contact-message-error"
              role="alert"
              className="text-label text-accent"
            >
              {errors.message?.message}
            </p>
          )}
        </div>

        {/* Honeypot — hidden from sighted and keyboard users, left for bots. */}
        <div aria-hidden="true" className="absolute left-[-9999px]">
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
            data-testid="contact-company-input"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("company")}
          />
        </div>

        <button
          type="submit"
          data-testid="contact-submit"
          disabled={status === "submitting" || !isValid}
          className={cn(
            buttonClassName.secondary,
            "self-start cursor-pointer border-grid-border px-6 py-3",
            "disabled:cursor-not-allowed disabled:opacity-40",
          )}
        >
          {status === "submitting" ? t("submitting") : t("submit")}
        </button>

        <div aria-live="polite" data-testid="contact-status">
          {status === "success" && (
            <p
              role="status"
              className="text-cta text-accent md:text-cta-desktop"
            >
              <span className="block font-mono uppercase tracking-label">
                {t("successTitle")}
              </span>
              <span className="mt-1 block text-body text-muted">
                {t("successBody")}
              </span>
            </p>
          )}
          {status === "error" && (
            <p
              role="alert"
              className="text-cta text-accent md:text-cta-desktop"
            >
              <span className="block font-mono uppercase tracking-label">
                {t("errorTitle")}
              </span>
              <span className="mt-1 block text-body text-muted">
                {t("errorBody")}
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
