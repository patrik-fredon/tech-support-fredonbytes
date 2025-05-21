import Link from 'next/link';

export default function PrivacyStaticPage() {
  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className={`
          prose prose-lg max-w-none
          bg-white dark:bg-gray-800
          shadow-lg rounded-xl overflow-hidden
          text-gray-900 dark:text-gray-100
          p-8
        `}>
          <h1>Zásady ochrany osobních údajů</h1>

          <p><strong>Společnost:</strong> FredonBytes s.r.o.<br />
            <strong>IČO:</strong> [DOPLNIT]<br />
            <strong>Sídlo:</strong> [DOPLNIT]<br />
            <strong>E-mail:</strong> [DOPLNIT]<br />
            <strong>Datum účinnosti:</strong> 21. 5. 2025</p>

          <hr />

          <h2>1. Úvod</h2>

          <p>Tento dokument popisuje, jak společnost FredonBytes s.r.o. zpracovává osobní údaje v souladu s Nařízením (EU) 2016/679 (GDPR) a zákony České republiky.</p>

          <h2>2. Správce osobních údajů</h2>

          <p>FredonBytes s.r.o., [DOPLNIT SÍDLO], IČO: [DOPLNIT], je správcem osobních údajů.</p>

          <h2>3. Účely a právní základ zpracování</h2>

          <p>Vaše osobní údaje zpracováváme za účelem:</p>
          <ul>
            <li>poskytování služeb a plnění smluv,</li>
            <li>plnění právních povinností,</li>
            <li>oprávněných zájmů správce (např. ochrana práv, marketing).</li>
          </ul>

          <p className="mt-8">
            <Link href="/" className="text-blue-500 hover:text-blue-700">
              Zpět na hlavní stránku
            </Link>
          </p>
        </article>
      </div>
    </div>
  );
}
