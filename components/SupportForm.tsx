'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useTranslations } from '@/app/context/TranslationContext';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
  project: z.string().min(2),
});

type FormData = z.infer<typeof formSchema>;

export default function SupportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { translations } = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(translations.support.error);
      }

      router.push('/thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {translations.form.name}
        </label>
        <input
          {...register('name')}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">
            {translations.form.minLength.replace('{length}', '2')}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {translations.form.email}
        </label>
        <input
          {...register('email')}
          type="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">
            {translations.form.invalidEmail}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="project" className="block text-sm font-medium text-gray-700">
          {translations.form.project}
        </label>
        <select
          {...register('project')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        >
          <option value="">{translations.form.required}</option>
          <option value="project1">Project 1</option>
          <option value="project2">Project 2</option>
        </select>
        {errors.project && (
          <p className="mt-1 text-sm text-red-600">
            {translations.form.minLength.replace('{length}', '2')}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          {translations.form.subject}
        </label>
        <input
          {...register('subject')}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">
            {translations.form.minLength.replace('{length}', '5')}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          {translations.form.message}
        </label>
        <textarea
          {...register('message')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">
            {translations.form.minLength.replace('{length}', '10')}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {isSubmitting ? translations.common.loading : translations.common.submit}
      </button>
    </form>
  );
}
