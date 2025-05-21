"use client";
import Link from "next/link";
import cs from "../../public/locales/footer/cs.json";
import en from "../../public/locales/footer/en.json";
import StructuredData from "./structuredData";
import theme from "./theme.json";

type FooterData = typeof cs;

import { useTranslations } from "../context/TranslationContext";

export default function Footer() {
  const { locale } = useTranslations();
  const data: FooterData = locale === "en" ? en : cs;

  let jsonLd = {};
  try {
    jsonLd = JSON.parse(data.jsonLd);
  } catch {
    jsonLd = {};
  }

  return (
    <footer
      className="relative mt-auto border-t-2 border-transparent"
      style={{
        background: theme.background,
        borderImage: `${theme.backgroundGradient} 1`,
        fontFamily: "Fira Mono, Menlo, Monaco, Consolas, monospace",
        boxShadow: theme.shadow,
        overflow: "hidden",
      }}
    >
      <StructuredData data={jsonLd} />

      <div className="container mx-auto  px-4 py-2 flex flex-col gap-1 items-center">
        <div className="flex items-center m-4">
          <span
            className="text-xl font-bold tracking-wide select-none code-slogan"
            style={{
              color: theme.slogan,
            }}
          >
            &copy; {new Date().getFullYear()}{" "}
            <Link
              href="https://fredonbytes.cloud"
              aria-label="FredonBytes Homepage"
              style={{ color: theme.accent }}
            >
              FredonBytes
            </Link>
            . {data.copyright}
          </span>
        </div>
        <div className="relative text-center mb-2 py-2 w-full flex flex-col items-center">
          <span
            className="text-md font-bold tracking-wide flex items-center gap-2 select-none code-slogan"
            style={{
              color: theme.slogan,
            }}
          >
            <span>{data.slogan}</span>
            <span
              className="animate-blink text-md font-mono"
              style={{ color: theme.sloganCursor }}
            >
              |
            </span>
          </span>
        </div>

        <div className=" flex flex-col md:flex-row justify-between items-center w-full gap-1">
          <div className="flex items-center gap-4">
            <span
              className="text-xs sm:text-sm"
              style={{ color: theme.text }}
            >
              <Link
                href="https://sites.fredonbytes.cloud"
                className="transition-colors hover:underline underline-offset-2"
                style={{ color: theme.text }}
                aria-label="FredonBytes sites router"
              >
                Other projects
              </Link>
            </span>
            <span
              className="text-xs sm:text-sm"
              style={{ color: theme.text }}
            >
              <Link
                href="https://help.fredonbytes.cloud"
                className="transition-colors hover:underline underline-offset-2"
                style={{ color: theme.text }}
                aria-label="FredonBytes help center"
              >
                Need help?
              </Link>
            </span>
          </div>

          <nav aria-label="Legal navigation">
            <ul className="flex flex-wrap gap-4 justify-center">
              {data.legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm font-mono transition-all hover:underline underline-offset-2"
                    style={{
                      color: theme.text,
                    }}
                    prefetch={false}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <style jsx>{`
        .code-slogan {
          background: ${theme.backgroundGradient};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s steps(2, start) infinite;
        }
      `}</style>
    </footer>
  );
}
