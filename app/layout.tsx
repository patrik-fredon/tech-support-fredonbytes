import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <TranslationProvider>
          <ThemeProvider>
            <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
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
              <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
