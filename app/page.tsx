'use client';

import { useTheme } from '@/app/context/ThemeContext';
import SupportForm from '@/components/SupportForm';

export default function Home() {
  const { t } = useTheme();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center text-4xl font-bold">
          {t.home.title}
        </h1>
        <p className="mb-8 text-center text-gray-600 dark:text-gray-300">
          {t.home.description}
        </p>
        <SupportForm />
      </div>
    </div>
  );
}
