'use client';

import { ConnectKitButton } from 'connectkit';
import { useAccount, useBalance } from 'wagmi';

import { Button } from '@/components';
import { Contracts } from '@/constants/contracts';

import ConnectedWallet from './ConnectedWallet';
import GiftButton from './GiftButton';

const ConnectWallet = () => {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address: address,
    token: Contracts.STABLE_COIN,
  });

  console.warn(balance);

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress }) => {
        return (
          <div>
            {isConnected ? (
              <div className="flex gap-2">
                <GiftButton />
                <ConnectedWallet address={truncatedAddress} balance={balance?.formatted} />
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={show}
                className="!text-primary-250 !bg-primary-500"
              >
                Connect Wallet
              </Button>
            )}
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default ConnectWallet;
