'use client';

import { type PropsWithChildren } from 'react';
import { base, baseSepolia } from 'wagmi/chains';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Networks } from '@/types';

const network = process.env.NEXT_PUBLIC_NETWORK as Networks;

const transports = {};

if (network === 'base') {
  // @ts-ignore
  transports[base.id] = http(process.env.NEXT_PUBLIC_RPC);
} else {
  // @ts-ignore
  transports[baseSepolia.id] = http(process.env.NEXT_PUBLIC_RPC);
}

const config = createConfig(
  getDefaultConfig({
    transports,
    chains: [network === 'baseSepolia' ? baseSepolia : base],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    appName: 'Dumont',
  }),
);

const queryClient = new QueryClient();

const ConnectKit = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="midnight">{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default ConnectKit;
