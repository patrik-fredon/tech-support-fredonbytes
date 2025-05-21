import { promises as fs } from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import path from "path";
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import StructuredData from "./structuredData";

// Debugging funkce
const debug = (message: any, ...optionalParams: any[]) => {
  console.log(`[LegalDocument Debug] ${message}`, ...optionalParams);
};

type LegalDocumentProps = {
  slug: string;
  locale: string;
};

export default async function LegalDocument({ slug, locale }: LegalDocumentProps) {
  console.log(`LegalDocument: Received slug=${slug}, locale=${locale}`);

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
  if (!filename) {
    console.error(`LegalDocument: No file mapping found for slug=${slug}`);
    return notFound();
  }

  const filePath = path.join(process.cwd(), "public/locales/legal", filename);
  console.log(`LegalDocument: Will try to load file from: ${filePath}`);

  let content = "";
  try {
    console.log("Attempting to read file:", filePath);
    content = await fs.readFile(filePath, "utf-8");
    console.log("File read successfully, content length:", content.length);
  } catch (error) {
    console.error("Error reading file:", error);
    return notFound();
  }

  async function processMarkdown(markdown: string): Promise<string> {
    try {
      // Parse frontmatter and get content
      const { content: mdContent } = matter(markdown);
      console.log("Raw markdown content:", mdContent.substring(0, 100) + "..."); // Log first 100 chars

      if (!mdContent || mdContent.trim().length === 0) {
        console.error("Empty markdown content after parsing frontmatter!");
        return "<p>Obsah dokumentu není k dispozici.</p>";
      }

      // Process markdown content with enhanced pipeline
      const file = await unified()
        .use(remarkParse) // Parse markdown
        .use(remarkRehype, { allowDangerousHtml: true }) // Convert to HTML AST
        .use(rehypeSanitize) // Sanitize HTML
        .use(rehypeStringify) // Convert to HTML string
        .process(mdContent);

      const html = String(file);
      console.log("Generated HTML length:", html.length);
      console.log("Sample of generated HTML:", html.substring(0, 100) + "...");

      if (!html || html.trim().length === 0) {
        throw new Error("No HTML generated from markdown");
      }

      return html;
    } catch (error) {
      console.error("Error processing markdown:", error);
      throw error;
    }
  }

  let html;
  try {
    html = await processMarkdown(content);
  } catch (error) {
    console.error("Failed to render markdown:", error);
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-red-500">Error: Failed to process content. Please try again later.</div>
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

  // Debug output
  console.log("Final HTML to render:", html);

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 py-12">
      <StructuredData data={jsonLd} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className={`
          prose prose-lg max-w-none
          bg-white dark:bg-gray-800
          shadow-lg rounded-xl overflow-hidden
          text-gray-900 dark:text-gray-100
        `}>
          <div
            className="px-8 py-10 space-y-4
              [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-6
              [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-8 [&>h2]:mb-4
              [&>p]:text-gray-700 [&>p]:dark:text-gray-300 [&>p]:leading-relaxed
              [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:space-y-2 [&>ul]:text-gray-700 [&>ul]:dark:text-gray-300
              [&>hr]:my-8 [&>hr]:border-gray-200 [&>hr]:dark:border-gray-700
              [&>strong]:font-semibold [&>strong]:text-gray-900 [&>strong]:dark:text-white"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </div>
    </div>
  );
}
