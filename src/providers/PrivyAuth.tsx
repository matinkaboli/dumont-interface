'use client';

import { ReactNode } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { base, baseSepolia } from 'wagmi/chains';
import { Networks } from '@/types';

const network = process.env.NEXT_PUBLIC_NETWORK as Networks;

export default function Privy({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#A23BEA',
          logo: '/images/logo.svg',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        supportedChains: [network === 'baseSepolia' ? baseSepolia : base],
      }}
    >
      {children}
    </PrivyProvider>
  );
}
