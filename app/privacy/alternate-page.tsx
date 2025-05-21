import LegalDocument from "@/app/components/LegalDocument";
import { cookies } from 'next/headers';

export default function PrivacyPage() {
  // Zdetekujeme preferovaný jazyk, výchozí je čeština
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');
  const locale = localeCookie?.value || 'cs';

  return (
    <div className="min-h-screen">
      <LegalDocument slug="privacy-policy" locale={locale} />
    </div>
  );
}
