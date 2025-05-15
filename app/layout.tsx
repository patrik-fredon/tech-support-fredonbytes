import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './context/ThemeContext';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Providers from "./providers";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ['latin'] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = {
  title: 'FredonBytes Tech Support',
  description: 'Technical support for FredonBytes services',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Získání locale z cookies nebo fallback na "cs"
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "cs";
  let messages = {};
  try {
    if (locale === "en") {
      messages = (await import("../public/locales/footer/en.json")).default;
    } else {
      messages = (await import("../public/locales/footer/cs.json")).default;
    }
  } catch {
    messages = {};
  }
  return (
    // <html lang="en" suppressHydrationWarning>
    //  <body className={inter.className}>
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <header className="border-b border-gray-200 dark:border-gray-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                      FredonBytes Support
                    </h1>
                  </div>
                  <div className="flex items-center space-x-4">
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                  </div>
                </div>
              </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
        </ThemeProvider>
        <Providers locale={locale} messages={messages}>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
