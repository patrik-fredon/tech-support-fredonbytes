import Link from 'next/link';

export default function TermsStaticPage() {
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
          <h1>Podmínky služby</h1>

          <p><strong>Společnost:</strong> FredonBytes s.r.o.<br />
            <strong>IČO:</strong> [DOPLNIT]<br />
            <strong>Sídlo:</strong> [DOPLNIT]<br />
            <strong>E-mail:</strong> [DOPLNIT]<br />
            <strong>Datum účinnosti:</strong> 21. 5. 2025</p>

          <hr />

          <h2>1. Úvod</h2>

          <p>Tyto podmínky upravují užívání služeb poskytovaných společností FredonBytes s.r.o. Užíváním služeb souhlasíte s těmito podmínkami.</p>

          <h2>2. Identifikace poskytovatele</h2>

          <p>FredonBytes s.r.o., [DOPLNIT SÍDLO], IČO: [DOPLNIT], je poskytovatelem služeb.</p>

          <h2>3. Popis služby</h2>

          <p>Podrobný popis nabízených služeb/produktů naleznete na našich webových stránkách.</p>

          <h2>4. Podmínky užívání</h2>

          <ul>
            <li>Uživatel je povinen používat služby v souladu s právními předpisy a těmito podmínkami.</li>
            <li>Je zakázáno zneužívat služby k nelegálním účelům.</li>
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
