import LegalDocument from "@/app/components/LegalDocument";
import { cookies } from 'next/headers';

export default function TermsPage() {
  // Zdetekujeme preferovaný jazyk, výchozí je čeština
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');
  const locale = localeCookie?.value || 'cs';

  return (
    <div className="min-h-screen">
      <LegalDocument slug="terms" locale={locale} />
    </div>
  );
}
