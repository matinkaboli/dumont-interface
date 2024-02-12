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
  const { address, isConnected, isConnecting } = useAccount();
  const { data: balance } = useBalance({
    address: address,
    token: Contracts.STABLE_COIN,
    watch: true,
  });

  useEffect(() => {
    dispatch(setBalance(balance?.formatted));
  }, [dispatch, balance]);

  useEffect(() => {
    dispatch(setAccount({ address, isConnected, isConnecting }));
  }, [dispatch, isConnecting]);

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        return (
          <>
            {isConnected ? (
              <div className="flex gap-2">
                <GiftButton />
                <ConnectedWallet />
              </div>
            ) : (
              <Button
                variant="link"
                size="sm"
                radius="lg"
                onClick={show}
                className="text-primary-250 bg-primary-500 hover:bg-primary-400 !font-bold"
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
