'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { usePrivy } from '@privy-io/react-auth';
import { useAccount, useBalance, useReadContract } from 'wagmi';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';

import { Button } from '@/components';
import { AppDispatch } from '@/redux/store';
import { getConfig } from '@/redux/features/configSlice';
import { fetchReferralAddress } from '@/redux/features/referralSlice';
import { setMaxBetAmount, setMinBetAmount } from '@/redux/features/betSlice';
import { setAccount, setBalance } from '@/redux/features/accountSlice';
import parseUnits from '@/helpers/parseUnits';
import VAULT_ABI from '@/abis/VAULT_ABI.json';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import isEmpty from '@/helpers/isEmpty';
import Routes from '@/constants/routes';

import ConnectedWallet from './ConnectedWallet';

const ConnectWallet = () => {
  const params = useParams();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { client } = useSmartWallets();
  const { login, authenticated, ready } = usePrivy();
  const address = client?.account?.address as `0x${string}`;
  const { details } = useTypedSelector((state) => state.config);

  const { isConnected, isConnecting } = useAccount();

  const { data: balance } = useBalance({
    address,
    token: details?.usdc,
    query: {
      refetchInterval: 8000,
      enabled: !isEmpty(address),
    },
  });

  const { data: maxBetAmount } = useReadContract({
    address: details?.vault,
    abi: VAULT_ABI,
    functionName: 'getMaximumBetAmount',
    query: {
      refetchInterval: 15000,
    },
  });

  const { data: minBetAmount } = useReadContract({
    address: details?.vault,
    abi: VAULT_ABI,
    functionName: 'getMinimumBetAmount',
  });

  useEffect(() => {
    dispatch(getConfig());
  }, []);

  useEffect(() => {
    dispatch(setAccount({ address, isConnected, isConnecting }));
  }, [address, isConnected, isConnecting]);

  useEffect(() => {
    if (balance && balance?.symbol === 'USDC') {
      dispatch(setBalance(balance?.formatted));
    }
  }, [balance, isConnected]);

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

  return (
    <>
      {ready && authenticated ? (
        <div className="flex items-center justify-between w-full">
          <Link href={Routes.HOME} className="sm:hidden block">
            <Image width={36} height={31} src="/images/logo.svg" alt="dumont" />
          </Link>
          <div className="flex items-center gap-2 ml-auto">
            {/*<AirdropButton />*/}
            {/*<RewardButton />*/}
            <ConnectedWallet />
          </div>
        </div>
      ) : (
        <Button
          variant="link"
          size="sm"
          radius="lg"
          onClick={login}
          disabled={!ready}
          className={clsx(
            'font-bold ml-auto',
            ready
              ? 'bg-primary-400 text-white hover:bg-primary-300'
              : 'bg-neutral-700 text-neutral-400 border-neutral-700',
          )}
        >
          Connect Wallet
        </Button>
      )}
    </>
  );
};

export default ConnectWallet;
