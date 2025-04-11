'use client';

import { useTheme } from '@/app/context/ThemeContext';
import { cn } from '@/lib/utils';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'px-4 py-2 rounded-md text-sm font-medium transition-colors',
        'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700',
        'text-gray-900 dark:text-gray-100'
      )}
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
} 