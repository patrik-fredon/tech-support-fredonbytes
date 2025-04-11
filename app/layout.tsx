import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './context/ThemeContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FredonBytes Tech Support',
  description: 'Technical support for FredonBytes services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
