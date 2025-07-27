import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { encodeFunctionData } from 'viem';
import { useWaitForTransactionReceipt } from 'wagmi';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';

import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import { AppDispatch } from '@/redux/store';
import { setIsGameCreated } from '@/redux/features/faro/faroSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import extractGameId from '@/helpers/extractGameId';
import formatUnits from '@/helpers/formatUnits';
import Routes from '@/constants/routes';
import { DEFAULT_APPROVE_VALUE } from '@/constants/static';
import ERC20_ABI from '@/abis/ERC20_ABI.json';
import GATEWAY_ABI from '@/abis/GATEWAY_ABI.json';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import ConfirmNewRound from '../views/card/_components/ConfirmNewRound';
import ErrorContent from '../views/_components/Dialog/ErrorContent';
import LongLoadingContent from '@/views/card/_components/Dialog/LongLoadingContent';

export const useNewRound = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { client } = useSmartWallets();
  const { details } = useTypedSelector((state) => state.config);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [isCreateGameLoading, setIsCreateGameLoading] = useState(false);
  const [errorMessageGame, setErrorMessageGame] = useState('');
  const [gameTx, setGameTx] = useState('');

  const {
    data: receiptData,
    isLoading: isWaitTXLoading,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash: gameTx as `0x${string}`,
  });

  useEffect(() => {
    if (isCreateGameLoading || isWaitTXLoading) {
      dispatch(
        openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: (
            <AnimatedDialogContent key='loading'>
              <LongLoadingContent activeIndex={loadingIndex} setActiveIndex={setLoadingIndex} />
            </AnimatedDialogContent>
          ),
        }),
      );
    }
  }, [isCreateGameLoading, isWaitTXLoading, loadingIndex]);

  useEffect(() => {
    if (isConfirmed && loadingIndex === 4) {
      setLoadingIndex(0);
      const id = extractGameId(receiptData.logs);

      if (id) {
        router.push(`${Routes.ROUND}/${id}`);
        dispatch(setIsGameCreated(true));
        dispatch(closeDialog());
      }
    }
  }, [isConfirmed, loadingIndex]);

  const onCreate = async () => {
    setIsCreateGameLoading(true);
    setGameTx('');

    if (!client) return;

    setErrorMessageGame('');
    try {
      const approveValue = formatUnits(DEFAULT_APPROVE_VALUE, 6).toString();

      const tx = await client.sendTransaction({
        account: client.account,
        calls: [
          {
            to: details!.usdc,
            data: encodeFunctionData({
              abi: ERC20_ABI,
              functionName: 'approve',
              args: [details!.gateway, approveValue],
            }),
          },
          {
            to: details!.gateway,
            data: encodeFunctionData({
              abi: GATEWAY_ABI,
              functionName: 'createFaro',
            }),
          },
        ],
      });

      setGameTx(tx);
    } catch (error) {
      setErrorMessageGame('Transaction failed. Please try again.');
      dispatch(
        openDialog({
          content: (
            <AnimatedDialogContent key='error'>
              <ErrorContent title='Something went wrong!' />
            </AnimatedDialogContent>
          ),
        }),
      );
    }
    setIsCreateGameLoading(false);
  };

  const onCreateRound = () => {
    dispatch(
      openDialog({
        content: <ConfirmNewRound onCreateGame={onCreate} />,
      }),
    );
  };

  return {
    onCreateRound,
    isCreateGameLoading,
    errorMessageGame,
  };
};
