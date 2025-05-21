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
  const { slug, locale } = params;
  const title = slug === "privacy-policy"
    ? "Privacy Policy | FredonBytes s.r.o."
    : "Terms of Service | FredonBytes s.r.o.";

  const description = slug === "privacy-policy"
    ? "How FredonBytes s.r.o. protects and processes your personal data in accordance with GDPR and Czech law."
    : "Terms of use for FredonBytes s.r.o. services under Czech law.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://fredonbytes.cloud/${locale}/${slug}`,
    },
  };
};
