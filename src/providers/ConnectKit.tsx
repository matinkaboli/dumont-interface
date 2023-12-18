import { type PropsWithChildren } from 'react';
import { createConfig, WagmiConfig } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.ALCHEMY_ID,
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID!,
    appName: 'Dumont',
  }),
);

const ConnectKit = ({ children }: PropsWithChildren) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  );
};

export default ConnectKit;
