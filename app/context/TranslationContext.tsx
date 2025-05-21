"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import csTranslations from "../../public/locales/cs.json";
import enTranslations from "../../public/locales/en.json";

type Translations = typeof csTranslations;
type TranslationContextType = {
  locale: "cs" | "en";
  translations: Translations;
  setLocale: (locale: "cs" | "en") => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);


export function TranslationProvider({ children, locale: initialLocale }: { children: ReactNode; locale: "cs" | "en" }) {
  const [locale, setLocaleState] = useState<"cs" | "en">(initialLocale);
  const [translations, setTranslations] = useState<Translations>(locale === "en" ? enTranslations : csTranslations);

  const setLocale = (newLocale: "cs" | "en") => {
    setLocaleState(newLocale);
    setTranslations(newLocale === "en" ? enTranslations : csTranslations);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`; // 1 rok
    document.documentElement.lang = newLocale;
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <TranslationContext.Provider value={{ locale, translations, setLocale }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslations must be used within a TranslationProvider");
  }
  return context;
}
