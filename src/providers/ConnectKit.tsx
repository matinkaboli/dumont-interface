'use client';

import { type PropsWithChildren } from 'react';
import { createConfig, WagmiConfig } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { optimism } from 'wagmi/chains';

const chains = [optimism];

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.ALCHEMY_ID,
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID!,
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
