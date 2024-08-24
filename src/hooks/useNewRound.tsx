import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import BN from 'bignumber.js';

import { closeDialog, openDialog, updateDialogContent } from '@/redux/features/dialogSlice';
import { AppDispatch } from '@/redux/store';
import { expireGame, postGame } from '@/redux/features/gameSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useApproval } from '@/hooks/useApproval';
import extractGameId from '@/helpers/extractGameId';
import GAME_FACTORY_ABI from '@/abis/GAME_FACTORY_ABI.json';
import formatUnits from '@/helpers/formatUnits';
import Routes from '@/constants/routes';
import { DEFAULT_APPROVE_VALUE } from '@/constants/static';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';
import LongLoadingContent from '@/views/_components/Dialog/LongLoadingContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';
import ApproveAllowance from '@/views/_components/Dialog/ApproveAllowance';
import Confirm from '@/views/_components/ConfirmNewRound';

export const useNewRound = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { details } = useTypedSelector((state) => state.config);
  const { referralAddress } = useTypedSelector((state) => state.referral);
  const [redirectId, setRedirectId] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { allowanceData, sendApprove, isApproveLoading } = useApproval(
    details?.gameFactory,
    onApproveSuccess,
    onApproveError,
  );

  const {
    writeContract: writeCreateGame,
    data: hash,
    isPending: isCreateGameLoading,
    isError: isWriteGameError,
  } = useWriteContract();

  const {
    data: receiptData,
    isSuccess: isConfirmed,
    isError: isWaitGameError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isApproveLoading || isCreateGameLoading) {
      dispatch(
        openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: (
            <AnimatedDialogContent key="loading">
              {isApproveLoading ? (
                <LoadingContent title="Waiting for the network" desc="It will take a few seconds" />
              ) : (
                <LongLoadingContent activeIndex={activeIndex} />
              )}
            </AnimatedDialogContent>
          ),
        }),
      );
    }
  }, [isApproveLoading, isCreateGameLoading]);

  useEffect(() => {
    if (activeIndex > 0) {
      dispatch(
        updateDialogContent(
          <AnimatedDialogContent key="loading">
            <LongLoadingContent activeIndex={activeIndex} />
          </AnimatedDialogContent>,
        ),
      );
    }

    if (activeIndex === 3) {
      const timer = setTimeout(() => {
        setActiveIndex(4);
      }, 2000);

      return () => clearTimeout(timer);
    } else if (activeIndex === 4) {
      const redirectTimer = setTimeout(() => {
        dispatch(closeDialog());
        dispatch(expireGame(false));
        setActiveIndex(0);
        router.push(`${Routes.ROUND}/${redirectId}`);
      }, 1000);

      return () => clearTimeout(redirectTimer);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (isConfirmed && receiptData) {
      const id = extractGameId(receiptData.logs);
      setRedirectId(id);
      onCreateGameSuccess(id);
    }
  }, [isConfirmed, receiptData]);

  useEffect(() => {
    if (isWriteGameError || isWaitGameError) {
      onError('Creating was unsuccessful', onCreateGame);
    }
  }, [isWriteGameError, isWaitGameError]);

  function onApproveSuccess() {
    dispatch(
      openDialog({
        dialogProps: { showCloseButton: false, disableEvents: true },
        content: (
          <AnimatedDialogContent key="confirm">
            <Confirm onCreateGame={onCreateGame} />
          </AnimatedDialogContent>
        ),
      }),
    );
  }

  function onCreateGameSuccess(id: number) {
    setActiveIndex(2);

    const timer = setTimeout(() => {
      dispatch(postGame({ id }))
        .unwrap()
        .then(() => {
          setActiveIndex(3);
        })
        .catch(() => onError('Game creation was unsuccessful', onCreateGame));
    }, 5000);

    return () => clearTimeout(timer);
  }

  function onError(title: string, func: () => void) {
    dispatch(
      openDialog({
        content: (
          <AnimatedDialogContent key="error">
            <ErrorContent title={title} onClick={func} />
          </AnimatedDialogContent>
        ),
      }),
    );
  }

  function onApproveError() {
    onError('Approve was unsuccessful', () => sendApprove(DEFAULT_APPROVE_VALUE));
  }

  const onCreateGame = () => {
    writeCreateGame?.(
      {
        address: details!.gameFactory,
        abi: GAME_FACTORY_ABI,
        functionName: 'createGame',
        args: [referralAddress],
      },
      {
        onSuccess: () => setActiveIndex(1),
      },
    );
  };

  const onCreateRound = () => {
    const isApproved = new BN(allowanceData as string).isGreaterThanOrEqualTo(
      formatUnits(DEFAULT_APPROVE_VALUE, 6),
    );

    dispatch(
      openDialog({
        content: isApproved ? (
          <Confirm onCreateGame={onCreateGame} />
        ) : (
          <ApproveAllowance onApprove={() => sendApprove(DEFAULT_APPROVE_VALUE)} />
        ),
      }),
    );
  };

  return {
    onCreateRound,
    isApproveLoading,
    isCreateGameLoading,
  };
};
