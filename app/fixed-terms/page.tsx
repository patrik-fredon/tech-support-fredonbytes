// Jednoduchá statická stránka s podmínkami služby
export default function TermsPage() {
  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className={`
          prose prose-lg max-w-none
          bg-white dark:bg-gray-800
          shadow-lg rounded-xl overflow-hidden
          text-gray-900 dark:text-gray-100
        `}>
          <div className="px-8 py-10 space-y-4">
            <h1 className="text-3xl font-bold mb-6">Podmínky služby</h1>
            
            <p><strong>Společnost:</strong> FredonBytes s.r.o.<br />
            <strong>IČO:</strong> [DOPLNIT]<br />
            <strong>Sídlo:</strong> [DOPLNIT]<br />
            <strong>E-mail:</strong> [DOPLNIT]<br />
            <strong>Datum účinnosti:</strong> 21. 5. 2025</p>
            
            <hr className="my-8 border-gray-200 dark:border-gray-700" />
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Úvod</h2>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Tyto podmínky upravují užívání služeb poskytovaných společností FredonBytes s.r.o. Užíváním služeb souhlasíte s těmito podmínkami.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Identifikace poskytovatele</h2>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              FredonBytes s.r.o., [DOPLNIT SÍDLO], IČO: [DOPLNIT], je poskytovatelem služeb.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Popis služby</h2>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Podrobný popis nabízených služeb/produktů naleznete na našich webových stránkách.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Podmínky užívání</h2>
            
            <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Uživatel je povinen používat služby v souladu s právními předpisy a těmito podmínkami.</li>
              <li>Je zakázáno zneužívat služby k nelegálním účelům.</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
