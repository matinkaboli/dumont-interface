'use client';

import { type PropsWithChildren } from 'react';
import { base, baseSepolia } from 'wagmi/chains';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Networks } from '@/types';

const network = process.env.NEXT_PUBLIC_NETWORK as Networks;

const transports = {} as any;

if (network === 'base') {
  // @ts-ignore
  transports[base.id] = http(process.env.NEXT_PUBLIC_RPC);
} else {
  // @ts-ignore
  transports[baseSepolia.id] = http(process.env.NEXT_PUBLIC_RPC);
}

const config = createConfig({
  transports,
  chains: [network === 'baseSepolia' ? baseSepolia : base],
});

const queryClient = new QueryClient();

const Wagmi = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Wagmi;
