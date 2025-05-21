import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { cn } from '@/lib/utils';
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "./components/Footer";
import { ThemeProvider } from './context/ThemeContext';
import { TranslationProvider } from './context/TranslationContext';
import "./globals.css";

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
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: "cs" | "en" };
}>) {
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body 
        suppressHydrationWarning
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased min-h-screen",
          "bg-gray-50 dark:bg-gray-900",
          "text-gray-900 dark:text-gray-100"
        )}
      >
        <TranslationProvider locale={params.locale}>
          <ThemeProvider>
            <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
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
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
