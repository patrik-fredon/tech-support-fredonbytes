import LegalDocument from "@/app/components/LegalDocument";
import { cookies } from 'next/headers';

export default async function TermsPage() {
  // Zdetekujeme preferovaný jazyk, výchozí je čeština
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');
  const locale = localeCookie?.value || 'cs';

  console.log("Terms Page: Using locale", locale);

  return (
    <div className="min-h-screen">
      <LegalDocument slug="terms" locale={locale} />
    </div>
  );
}
