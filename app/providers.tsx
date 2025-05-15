"use client";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
  locale: string;
  messages: Record<string, unknown>;
};

export default function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Prague">
      {children}
    </NextIntlClientProvider>
  );
}
