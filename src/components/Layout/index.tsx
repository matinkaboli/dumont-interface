'use client';

import { ReactNode, useEffect, useState } from 'react';

import Header from './Header';
import Footer from './Footer';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { encodeFunctionData } from 'viem';
import GAME_FACTORY_ABI from '@/abis/GAME_FACTORY_ABI.json';
import { useWaitForTransactionReceipt } from 'wagmi';
import extractGameId from '@/helpers/extractGameId';
import formatUnits from '@/helpers/formatUnits';
import ERC20_ABI from '@/abis/ERC20_ABI.json';
import { DEFAULT_APPROVE_VALUE } from '@/constants/static';
import { postGame } from '@/redux/features/gameSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import Routes from '@/constants/routes';
import { useRouter } from 'next/navigation';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { client } = useSmartWallets();
  const [isLoadingNft, setIsLoadingNft] = useState(false);
  const [errorMessageNft, setErrorMessageNft] = useState('');
  const [nftTx, setNftTx] = useState('');
  const { details } = useTypedSelector((state) => state.config);
  const { referralAddress } = useTypedSelector((state) => state.referral);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const mintNftTransaction = async () => {
    setIsLoadingNft(true);
    setNftTx('');
    if (!client) {
      console.error('No smart account client found');
      return;
    }

    setErrorMessageNft('');

    try {
      const approveValue = formatUnits(DEFAULT_APPROVE_VALUE, 6).toString();

      const tx = await client.sendTransaction({
        account: client.account,
        calls: [
          {
            to: details!.usdt,
            data: encodeFunctionData({
              abi: ERC20_ABI,
              functionName: 'approve',
              args: [details?.gameFactory, approveValue],
            }),
          },
          {
            to: details!.gameFactory,
            data: encodeFunctionData({
              abi: GAME_FACTORY_ABI,
              functionName: 'createGame',
              args: [referralAddress],
            }),
          },
        ],
      });

      console.log('tx', tx);
      setNftTx(tx);
    } catch (error) {
      console.error('Transaction failed:', error);
      setErrorMessageNft('Transaction failed. Please try again.');
    }
    setIsLoadingNft(false);
  };

  const {
    data: receiptData,
    isSuccess: isConfirmed,
    isError: isWaitGameError,
  } = useWaitForTransactionReceipt({
    hash: nftTx as `0x${string}`,
  });

  useEffect(() => {
    if (isConfirmed && receiptData) {
      const id = extractGameId(receiptData.logs);
      dispatch(postGame({ id }))
        .unwrap()
        .then(() => {
          router.push(`${Routes.ROUND}/${id}`);
        });
    }
  }, [receiptData]);

  return (
    <div className="relative lg:pb-0 pb-24">
      <div className="absolute -z-10 top-0 left-0 right-0 bg-gradiant-layout blur-[20px] w-screen h-[243px]" />

      <div className="lg:w-[840px] w-full mx-auto flex flex-col min-h-screen lg:px-0 px-5 pt-10 pb-6">
        <Header />
        <button
          className="bg-primary-600 text-white w-fit p-2"
          disabled={isLoadingNft}
          onClick={mintNftTransaction}
        >
          {isLoadingNft ? 'loading...' : 'new Round'}
        </button>
        {isConfirmed && <div className="text-white">{extractGameId(receiptData.logs)}</div>}
        <main className="pt-10 md:pb-16 pb-2">{children}</main>
        <Footer className="mt-auto" />
      </div>
    </div>
  );
};

export default Layout;
