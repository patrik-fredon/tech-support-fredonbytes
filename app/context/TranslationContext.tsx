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

function getInitialLocale(): "cs" | "en" {
  if (typeof window !== "undefined") {
    const cookie = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
    if (cookie && (cookie[1] === "en" || cookie[1] === "cs")) return cookie[1] as "cs" | "en";
    if (navigator.language.startsWith("en")) return "en";
    return "cs";
  }
  return "cs"; // Server-side fallback
}

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<"cs" | "en">(getInitialLocale);
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
