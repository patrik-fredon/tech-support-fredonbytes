import LegalDocument from "@/app/components/LegalDocument";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    slug: string;
    locale: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateStaticParams() {
  return [
    { locale: 'en', slug: 'privacy-policy' },
    { locale: 'en', slug: 'terms' },
    { locale: 'cs', slug: 'privacy-policy' },
    { locale: 'cs', slug: 'terms' },
  ];
}

export default function LegalPage({ params }: PageProps) {
  const validSlugs = ['privacy-policy', 'terms'];
  const validLocales = ['en', 'cs'];

  if (!params.slug || !validSlugs.includes(params.slug)) {
    console.error('Invalid or missing slug:', params.slug);
    return notFound();
  }

  if (!params.locale || !validLocales.includes(params.locale)) {
    console.error('Invalid or missing locale:', params.locale);
    return notFound();
  }

  console.log('Rendering legal page with params:', params);
  
  return (
    <div className="min-h-screen">
      <LegalDocument slug={params.slug} locale={params.locale} />
    </div>
  );
}
