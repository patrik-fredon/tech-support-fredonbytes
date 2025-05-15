'use client';

import SupportForm from '@/components/SupportForm';
import { useTranslations } from '@/app/context/TranslationContext';

export default function Home() {
  const { translations } = useTranslations();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center text-4xl font-bold">
          {translations.home.title}
        </h1>
        <p className="mb-8 text-center text-gray-600 dark:text-gray-300">
          {translations.home.description}
        </p>
        <SupportForm />
      </div>
    </div>
  );
}
