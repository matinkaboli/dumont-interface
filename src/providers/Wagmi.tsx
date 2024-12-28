'use client';

import { type PropsWithChildren } from 'react';
import { base, baseSepolia } from 'wagmi/chains';
import { http } from 'wagmi';
import { createConfig, WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { coinbaseWallet } from 'wagmi/connectors';

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
  connectors: [
    coinbaseWallet({ appName: 'Create Wagmi', preference: 'smartWalletOnly' }),
  ],
});

const queryClient = new QueryClient();

const Wagmi = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>{children}</WagmiProvider>
    </QueryClientProvider>
  );
};

export default Wagmi;
