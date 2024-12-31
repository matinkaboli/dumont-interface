'use client';

import { ReactNode } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { base, baseSepolia } from 'wagmi/chains';
import { SmartWalletsProvider } from '@privy-io/react-auth/smart-wallets';

import { Networks } from '@/types';

const network = process.env.NEXT_PUBLIC_NETWORK as Networks;

export default function Privy({ children }: { children: ReactNode }) {

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        appearance: {
          theme: '#2E2D36',
          accentColor: '#DAA7FE',
          logo: '/images/text-logo.svg',
        },
        loginMethods: ['email', 'wallet', 'google'],
        embeddedWallets: {
          createOnLogin: 'all-users',
          showWalletUIs: false,
        },
        defaultChain: baseSepolia,
        supportedChains: [network === 'baseSepolia' ? baseSepolia : base],
      }}
    >
      <SmartWalletsProvider>
        {children}
      </SmartWalletsProvider>
    </PrivyProvider>
  );
}
