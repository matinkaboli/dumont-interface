import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dumont',
  description: 'Dumont is a blockchain-based card game.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
    <body className={inter.className}>
    <link rel='icon' href='/images/favicon.ico' sizes='any' />
    <Providers>
      {children}
    </Providers>
    </body>
    </html>
  );
}
