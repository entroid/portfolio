import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messagesEn from "@/i18n/messages/en.json";
import messagesEs from "@/i18n/messages/es.json";

type Locale = "en" | "es";

export function renderWithIntl(
  ui: ReactElement,
  { locale = "en" }: { locale?: Locale } = {},
) {
  const messages = locale === "es" ? messagesEs : messagesEn;

  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );
}
