'use client';

import { useEffect } from 'react';
import { ConnectKitButton } from 'connectkit';
import { useAccount, useBalance } from 'wagmi';
import { useDispatch } from 'react-redux';

import { setAccount, setBalance } from '@/redux/features/accountSlice';
import { Button } from '@/components';
import { Contracts } from '@/constants/contracts';

import ConnectedWallet from './ConnectedWallet';
import GiftButton from './GiftButton';

const ConnectWallet = () => {
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address: address,
    token: Contracts.STABLE_COIN,
  });

  useEffect(() => {
    dispatch(setAccount(address));
    dispatch(setBalance(balance?.formatted));
  }, [address, balance]);

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        return (
          <>
            {isConnected ? (
              <div className="flex gap-2">
                <GiftButton />
                <ConnectedWallet address={address} balance={balance?.formatted} />
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
          </>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default ConnectWallet;
