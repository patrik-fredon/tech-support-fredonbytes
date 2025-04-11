'use client';

import { useTheme } from '@/app/context/ThemeContext';
import { cn } from '@/lib/utils';

export function ThemeSwitcher() {
  const { theme, toggleTheme, t } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'px-4 py-2 rounded-md text-sm font-medium transition-colors',
        'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700',
        'text-gray-900 dark:text-gray-100',
        'border border-gray-200 dark:border-gray-700',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
        'flex items-center gap-2'
      )}
      aria-label={t.common.theme}
    >
      {theme === 'light' ? (
        <>
          <span className="text-lg">🌙</span>
          <span>{t.common.dark}</span>
        </>
      ) : (
        <>
          <span className="text-lg">☀️</span>
          <span>{t.common.light}</span>
        </>
      )}
    </button>
  );
} 