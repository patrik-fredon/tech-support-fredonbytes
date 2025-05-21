'use client';

import { useTheme } from '@/app/context/ThemeContext';
import { useTranslations } from '@/app/context/TranslationContext';
import { cn } from '@/lib/utils';
import React from 'react';

export function ThemeSwitcher(): React.JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const { translations } = useTranslations();

  const handleThemeChange = () => {
    // Add a small delay to allow the animation to complete
    requestAnimationFrame(() => {
      toggleTheme();
    });
  };

  return (
    <button
      onClick={handleThemeChange}
      className={cn(
        'px-4 py-2 rounded-md text-sm font-medium',
        'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700',
        'text-gray-700 dark:text-gray-300',
        'border border-gray-200 dark:border-gray-700',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-primary-400',
        'flex items-center gap-2 transition-all duration-200 ease-in-out',
        'shadow-sm hover:shadow'
      )}
      aria-label={translations.common.theme}
    >
      {theme === 'dark' ? (
        <>
          <span className="text-lg">🌙</span>
          <span>{translations.common.dark}</span>
        </>
      ) : (
        <>
          <span className="text-lg">☀️</span>
          <span>{translations.common.light}</span>
        </>
      )}
    </button>
  );
}
