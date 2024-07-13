'use client';

import { useEffect } from 'react';
import { ConnectKitButton } from 'connectkit';
import { useAccount, useBalance } from 'wagmi';
import { useDispatch } from 'react-redux';

import { setAccount, setBalance } from '@/redux/features/accountSlice';
import { getConfig } from '@/redux/features/configSlice';
import { AppDispatch } from '@/redux/store';
import { Button } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import ConnectedWallet from './ConnectedWallet';
import RewardButton from './RewardButton';

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
    token: details?.usdt,
    watch: true,
  });

  useEffect(() => {
    if (balance?.symbol === 'USDT') {
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
                <RewardButton />
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
