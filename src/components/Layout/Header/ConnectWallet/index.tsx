'use client';

import { useEffect } from 'react';
import { ConnectKitButton } from 'connectkit';
import { useAccount, useBalance } from 'wagmi';
import { useDispatch } from 'react-redux';

import { setAccount, setBalance } from '@/redux/features/accountSlice';
import { Button } from '@/components';
import { getConfig } from '@/redux/features/configSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { AppDispatch } from '@/redux/store';

import ConnectedWallet from './ConnectedWallet';
import GiftButton from './GiftButton';

// Custom hook for fetching config details
const useFetchDetails = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getConfig());
  }, [dispatch]);
};

// Custom hook for managing account and balance
const useWalletInfo = () => {
  const dispatch = useDispatch();
  const { address, isConnected, isConnecting } = useAccount();
  const { details } = useTypedSelector(state => state.config);
  const { data: balance } = useBalance({
    address,
    token: '0xe195CBbf6a677ebBf2F1Cf6d4441b22B61BA9E4d',
    watch: true,
    enabled: Boolean(details?.usdt)
  });

  useEffect(() => {
    if (balance?.formatted) {
      dispatch(setBalance(balance.formatted));
    }
  }, [dispatch, balance]);

  useEffect(() => {
    dispatch(setAccount({ address, isConnected, isConnecting }));
  }, [dispatch, address, isConnected, isConnecting]);
};

const ConnectWallet = () => {
  useFetchDetails();

  useWalletInfo();

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
