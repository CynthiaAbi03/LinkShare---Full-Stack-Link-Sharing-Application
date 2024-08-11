import type { Metadata } from 'next';
import { Instrument_Sans, Inter } from 'next/font/google';
import { Providers } from './Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});
export const metadata: Metadata = {
  title: 'Dev Links',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={instrumentSans.className}>{children}</body>
      </Providers>
    </html>
  );
}
