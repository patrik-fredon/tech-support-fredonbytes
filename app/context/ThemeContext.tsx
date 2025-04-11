'use client';

import { translations } from '@/app/i18n/translations';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type Language = keyof typeof translations;
type Theme = 'light' | 'dark';

interface ThemeContextType {
  language: Language;
  theme: Theme;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  t: typeof translations[keyof typeof translations];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('cs');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Načtení uloženého jazyka a tématu z localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    const savedTheme = localStorage.getItem('theme') as Theme;

    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Uložení jazyka a tématu do localStorage
    localStorage.setItem('language', language);
    localStorage.setItem('theme', theme);

    // Aplikace tématu na root element
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [language, theme]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'cs' ? 'en' : 'cs');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{
      language,
      theme,
      toggleLanguage,
      toggleTheme,
      t: translations[language]
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 