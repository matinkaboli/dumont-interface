'use client';

import { type PropsWithChildren } from 'react';
import { createConfig, WagmiConfig } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { baseSepolia } from 'wagmi/chains';

const chains = [baseSepolia];

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    appName: 'Dumont',
    chains,
  }),
);

const ConnectKit = ({ children }: PropsWithChildren) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider theme="midnight">{children}</ConnectKitProvider>
    </WagmiConfig>
  );
};

export default ConnectKit;
