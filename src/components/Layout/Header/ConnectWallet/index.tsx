'use client';

import { useEffect } from 'react';
import { ConnectKitButton } from 'connectkit';
import { useAccount, useBalance, useReadContract } from 'wagmi';
import { useDispatch } from 'react-redux';

import { setAccount, setBalance } from '@/redux/features/accountSlice';
import { setMaxBetAmount, setMinBetAmount } from '@/redux/features/betSlice';
import { getConfig } from '@/redux/features/configSlice';
import { AppDispatch } from '@/redux/store';
import { Button } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import parseUnits from '@/helpers/parseUnits';
import VAULT_ABI from '@/abis/VAULT_ABI.json';

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
  const { details } = useTypedSelector((state) => state.config);

  const { address, isConnected, isConnecting } = useAccount();

  const { data: balance } = useBalance({
    address,
    token: details?.usdt,
  });

  const { data: maxBetAmount } = useReadContract({
    address: details?.valut,
    abi: VAULT_ABI,
    functionName: 'getMaximumBetAmount',
  });

  const { data: minBetAmount } = useReadContract({
    address: details?.valut,
    abi: VAULT_ABI,
    functionName: 'getMinimumBetAmount',
  });

  useEffect(() => {
    dispatch(setAccount({ address, isConnected, isConnecting }));
  }, [dispatch, address, isConnected, isConnecting]);

  useEffect(() => {
    if (balance && balance?.symbol === 'USDT') {
      dispatch(setBalance(balance?.formatted));
    }
  }, [balance]);

  useEffect(() => {
    if (minBetAmount) dispatch(setMinBetAmount(parseUnits(minBetAmount as number, 6).toNumber()));
  }, [minBetAmount]);

  useEffect(() => {
    if (maxBetAmount) dispatch(setMaxBetAmount(parseUnits(maxBetAmount as number, 6).toNumber()));
  }, [maxBetAmount]);
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
