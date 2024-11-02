import { PropsWithChildren } from 'react';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout';
import ConnectKit from '@/providers/ConnectKit';
import Redux from '@/providers/Redux';
import { HotJar } from '@/components/Hotjar';
import './globals.css';
import DialogRoot from './DialogRoot';
import ConfettiRoot from './ConfettiRoot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dumont | Provably fair gambling card game',
  description: 'Provably fair gambling card game',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <HotJar />
      </head>
      <body className={inter.className}>
        <Redux>
          <ConnectKit>
            <Layout>
              {children}
              <DialogRoot />
              <ConfettiRoot />
            </Layout>
          </ConnectKit>
        </Redux>
      </body>
    </html>
  );
}
