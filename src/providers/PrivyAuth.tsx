'use client';

import { ReactNode } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';

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
      }}
    >
      {children}
    </PrivyProvider>
  );
}
