'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, usePathname } from 'next/navigation';
import { useAccount, useBalance, useReadContract } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';

import { Button } from '@/components';
import { AppDispatch } from '@/redux/store';
import { getConfig } from '@/redux/features/configSlice';
import { fetchReferralAddress } from '@/redux/features/referralSlice';
import { setMaxBetAmount, setMinBetAmount } from '@/redux/features/betSlice';
import { setAccount, setBalance, setIsAirdropEligible } from '@/redux/features/accountSlice';
import parseUnits from '@/helpers/parseUnits';
import VAULT_ABI from '@/abis/VAULT_ABI.json';
import AIRDROP_ABI from '@/abis/AIRDROP_ABI.json';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import RewardButton from './RewardButton';
import AirdropButton from './AirdropButton';
import ConnectedWallet from './ConnectedWallet';

// Custom hook for fetching config details
const useFetchDetails = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getConfig());
  }, [dispatch]);
};

// Custom hook for managing account and balance
const useWalletInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const pathname = usePathname();
  const { details } = useTypedSelector((state) => state.config);

  const { address, isConnected, isConnecting } = useAccount();

  const { data: balance } = useBalance({
    address,
    token: details?.usdt,
    query: {
      refetchInterval: 8000,
    },
  });

  const { data: maxBetAmount } = useReadContract({
    address: details?.valut,
    abi: VAULT_ABI,
    functionName: 'getMaximumBetAmount',
    query: {
      refetchInterval: 15000,
    },
  });

  const { data: minBetAmount } = useReadContract({
    address: details?.valut,
    abi: VAULT_ABI,
    functionName: 'getMinimumBetAmount',
  });

  const { data: isAirdropEligible } = useReadContract({
    address: details?.airdrop,
    abi: AIRDROP_ABI,
    functionName: 'claimers',
    args: [address],
  });

  useEffect(() => {
    dispatch(setAccount({ address, isConnected, isConnecting }));
  }, [dispatch, address, isConnected, isConnecting]);

  useEffect(() => {
    if (balance && balance?.symbol === 'USDC') {
      dispatch(setBalance(balance?.formatted));
    }
  }, [balance]);

  useEffect(() => {
    if (isAirdropEligible !== undefined) {
      const claimableAmountBigInt = isAirdropEligible as BigInt;
      const claimableAmount = claimableAmountBigInt.toString();

      dispatch(setIsAirdropEligible(claimableAmount));
    }
  }, [address, isAirdropEligible]);

  useEffect(() => {
    if (minBetAmount) dispatch(setMinBetAmount(parseUnits(minBetAmount as number, 6).toNumber()));
  }, [minBetAmount]);

  useEffect(() => {
    if (maxBetAmount) dispatch(setMaxBetAmount(parseUnits(maxBetAmount as number, 6).toNumber()));
  }, [maxBetAmount]);

  useEffect(() => {
    const hasReferralId = params?.id && pathname.includes('/i/');

    if (hasReferralId) {
      dispatch(fetchReferralAddress({ id: params.id as string, currentAddress: address }));
    }
  }, [params.id, pathname, dispatch, address]);
};

const ConnectWallet = () => {
  const { login, authenticated, ready, user } = usePrivy();

  useFetchDetails();

  useWalletInfo();

  return (
    <>
      {ready && authenticated ? (
        <div className="flex items-center gap-2">
          <AirdropButton />
          <RewardButton />
          <ConnectedWallet />
        </div>
      ) : (
        <Button
          variant="link"
          size="sm"
          radius="lg"
          onClick={login}
          disabled={!ready}
          className="text-primary-250 bg-primary-500 hover:bg-primary-400 !font-bold"
        >
          Connect Wallet
        </Button>
      )}
    </>
  );
};

export default ConnectWallet;
