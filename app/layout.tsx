import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FredonBytes Tech Support',
  description: 'Technical support for FredonBytes projects',
  keywords: 'tech support, help desk, customer support',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-50">{children}</main>
      </body>
    </html>
  );
}
