import LegalDocument from "@/app/components/LegalDocument";

type Params = {
  params: {
    slug: string;
    locale: string;
  };
};

export default function LegalPage({ params }: Params) {
  if (!params.slug || !params.locale) return null;
  return <LegalDocument slug={params.slug} locale={params.locale} />;
}
