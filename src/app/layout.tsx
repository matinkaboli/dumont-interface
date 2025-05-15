import { PropsWithChildren } from 'react';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout';
import { HotJar } from '@/components/Hotjar';
import Providers from '@/providers';
import { Toast } from '@/components';
import './globals.css';
import DialogRoot from './DialogRoot';
import ConfettiRoot from './ConfettiRoot';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dumont | Provably fair gambling card game',
  description: 'Provably fair gambling card game',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en' className={inter.className}>
    <head>
      <HotJar />
    </head>
    <body>
    <Providers>
      <Layout>
        {children}
        <DialogRoot />
        <Toast />
      </Layout>
      <ConfettiRoot />
    </Providers>
    </body>
    </html>
  );
}
