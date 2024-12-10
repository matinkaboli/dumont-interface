import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useWaitForTransactionReceipt } from 'wagmi';
import { encodeFunctionData } from 'viem';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';

import { AppDispatch } from '@/redux/store';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import extractGameId from '@/helpers/extractGameId';
import formatUnits from '@/helpers/formatUnits';
import Routes from '@/constants/routes';
import { DEFAULT_APPROVE_VALUE } from '@/constants/static';
import ERC20_ABI from '@/abis/ERC20_ABI.json';
import GAME_FACTORY_ABI from '@/abis/GAME_FACTORY_ABI.json';
import { useHidePrivyError } from './useHidePrivyError';
import { setIsGameCreated } from '@/redux/features/gameSlice';

export const useNewRound = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { client } = useSmartWallets();
  const [isCreateGameLoading, setIsCreateGameLoading] = useState(false);
  const [errorMessageGame, setErrorMessageGame] = useState('');
  const [gameTx, setGameTx] = useState('');
  const { details } = useTypedSelector((state) => state.config);
  const { referralAddress } = useTypedSelector((state) => state.referral);

  useHidePrivyError(isCreateGameLoading);

  const onCreateRound = async () => {
    setIsCreateGameLoading(true);
    setGameTx('');
    if (!client) {
      console.error('No smart account client found');
      return;
    }

    setErrorMessageGame('');

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

      setGameTx(tx);
    } catch (error) {
      console.error('Transaction failed:', error);
      setErrorMessageGame('Transaction failed. Please try again.');
    }
    setIsCreateGameLoading(false);
  };

  const { data: receiptData, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: gameTx as `0x${string}`,
  });

  useEffect(() => {
    if (isConfirmed && receiptData) {
      const id = extractGameId(receiptData.logs);
      if(id) {
        router.push(`${Routes.ROUND}/${id}`);
        dispatch(setIsGameCreated(true));
      }
    }
  }, [isConfirmed, receiptData]);

  return {
    onCreateRound,
    isCreateGameLoading,
    errorMessageGame,
  };
};
