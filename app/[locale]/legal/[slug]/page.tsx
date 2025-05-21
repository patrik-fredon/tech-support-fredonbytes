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

export default async function LegalPage({ params }: PageProps) {
  // Validate the slug and locale parameters
  console.log("DEBUG: Rendering legal page with params:", params);

  const validSlugs = ['privacy-policy', 'terms'];
  const validLocales = ['en', 'cs'];

  // Verify slug
  if (!params?.slug || !validSlugs.includes(params.slug)) {
    console.error('Invalid or missing slug:', params?.slug);
    return notFound();
  }

  // Verify locale
  if (!params?.locale || !validLocales.includes(params.locale)) {
    console.error('Invalid or missing locale:', params?.locale);
    return notFound();
  }

  try {
    console.log(`DEBUG: About to render LegalDocument with slug=${params.slug}, locale=${params.locale}`);
    return (
      <div className="min-h-screen">
        <LegalDocument slug={params.slug} locale={params.locale} />
      </div>
    );
  } catch (error) {
    console.error('Error rendering legal document:', error);
    return notFound();
  }
}
