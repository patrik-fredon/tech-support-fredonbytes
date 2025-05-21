"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  
  // Check local storage
  const storedTheme = localStorage.getItem('theme') as Theme | null;
  if (storedTheme) {
    console.log('Using stored theme:', storedTheme);
    return storedTheme;
  }

  // Check system preference
  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
  console.log('System prefers dark mode:', systemPreference);
  return systemPreference ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    console.log('Setting theme:', theme);
    
    // Remove both classes first
    root.classList.remove("light", "dark");
    
    // Add the current theme class
    root.classList.add(theme);
    
    // Store the theme preference
    localStorage.setItem("theme", theme);
    
    // Update metadata
    document.documentElement.setAttribute('data-theme', theme);
    
    console.log('Theme applied:', {
      classList: root.classList.toString(),
      storedTheme: localStorage.getItem('theme')
    });
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
