import { promises as fs } from "fs";
import matter from "gray-matter";
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import { notFound } from "next/navigation";
import path from "path";
import StructuredData from "./structuredData";

type LegalDocumentProps = {
  slug: string;
  locale: string;
};

export default async function LegalDocument({ slug, locale }: LegalDocumentProps) {
  // Map slugs to filenames
  const fileMap: Record<string, string> = {
    "privacy-policy": "privacy-policy.en.md",
    "terms": "terms.en.md",
  };

  if (locale === "cs") {
    fileMap["privacy-policy"] = "privacy-policy.cs.md";
    fileMap["terms"] = "terms.cs.md";
  }

  const filename = fileMap[slug];
  if (!filename) return notFound();

  const filePath = path.join(process.cwd(), "public/locales/legal", filename);

  let content = "";
  try {
    console.log("Attempting to read file:", filePath);
    content = await fs.readFile(filePath, "utf-8");
    console.log("File read successfully");
  } catch (error) {
    console.error("Error reading file:", error);
    return notFound();
  }

  let html = "";
  try {
    // Parse frontmatter and content
    const { content: mdContent } = matter(content);
    console.log("Raw markdown content:", mdContent.substring(0, 100) + "..."); // Log first 100 chars

    if (!mdContent) {
      throw new Error("No markdown content found after parsing");
    }

    // Process markdown content using remark
    const result = await unified()
      .use(remarkParse)
      .use(remarkHtml)
      .process(mdContent);

    html = String(result);
    console.log("Generated HTML length:", html.length);
    console.log("Sample of generated HTML:", html.substring(0, 100) + "...");

    if (!html) {
      throw new Error("No HTML generated from markdown");
    }

  } catch (error) {
    console.error("Error processing markdown:", error);
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-red-500">Error: Failed to process content</div>
      </main>
    );
  }

  // JSON-LD structured data
  const jsonLd = {
    "@type": "WebPage",
    "name": slug === "privacy-policy"
      ? locale === "cs"
        ? "Zásady ochrany osobních údajů"
        : "Privacy Policy"
      : locale === "cs"
        ? "Podmínky služby"
        : "Terms of Service",
    "inLanguage": locale,
    "publisher": {
      "@type": "Organization",
      "name": "FredonBytes s.r.o.",
      "url": "https://fredonbytes.cloud"
    }
  };

  return (
    <>
      <StructuredData data={jsonLd} />
      <div className="max-w-4xl mx-auto">
        <div className="text-base leading-7">
          <div 
            dangerouslySetInnerHTML={{ __html: html }}
            className="[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-6 
                       [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-8 [&>h2]:mb-4
                       [&>p]:mb-4 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4 [&>ul]:space-y-2
                       [&>hr]:my-8 [&>hr]:border-t [&>hr]:border-gray-200 dark:[&>hr]:border-gray-700
                       [&>strong]:font-semibold [&>em]:italic
                       [&>a]:text-blue-600 dark:[&>a]:text-blue-400 [&>a]:underline
                       [&>blockquote]:pl-4 [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 dark:[&>blockquote]:border-gray-700 [&>blockquote]:italic"
          />
        </div>
      </div>
    </>
  );
}
