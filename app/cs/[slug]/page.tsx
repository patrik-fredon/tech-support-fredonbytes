import LegalDocument from "@/app/components/LegalDocument";

type Params = {
  params: {
    slug: string;
    locale: string;
  };
};

export default async function LegalPage({ params }: Params) {
  const { slug, locale } = await params;
  if (!slug || !locale) return null;
  return <LegalDocument slug={slug} locale={locale} />;
}

export const generateMetadata = async ({ params }: Params) => {
  const { slug, locale } = await params;
  const title = slug === "privacy-policy"
    ? "Zásady ochrany osobních údajů | FredonBytes s.r.o."
    : "Podmínky služby | FredonBytes s.r.o.";

  const description = slug === "privacy-policy"
    ? "Jak FredonBytes s.r.o. chrání a zpracovává vaše osobní údaje dle GDPR a české legislativy."
    : "Podmínky užívání služeb FredonBytes s.r.o. dle české legislativy.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://fredonbytes.cloud/${locale}/${slug}`,
    },
  };
};
