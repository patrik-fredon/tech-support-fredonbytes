import { notFound } from "next/navigation";
import { readFileSync, existsSync } from "fs";
import path from "path";

type Params = {
  params: {
    slug: string;
    locale: string;
  };
};

export async function generateStaticParams() {
  // Předpokládáme, že právní dokumenty jsou v public/locales/footer/cs.json a en.json pod legalLinks
  const locales = ["cs", "en"];
  const slugs = new Set<string>();

  for (const locale of locales) {
    const filePath = path.join(process.cwd(), "public/locales/footer", `${locale}.json`);
    if (existsSync(filePath)) {
      const data = JSON.parse(readFileSync(filePath, "utf-8"));
      if (Array.isArray(data.legalLinks)) {
        data.legalLinks.forEach((link: { href: string }) => {
          // Očekáváme formát "/legal/xxx"
          const match = link.href.match(/^\/legal\/(.+)/);
          if (match) slugs.add(match[1]);
        });
      }
    }
  }

  return Array.from(slugs).map((slug) => ({ slug }));
}

export default function LegalPage({ params }: Params) {
  // Zde načtěte obsah právního dokumentu podle params.slug a params.locale
  // Pro demo pouze jednoduchý fallback
  if (!params.slug) return notFound();
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Právní dokument: {params.slug}</h1>
      <p>Obsah právního dokumentu zde...</p>
    </main>
  );
}
