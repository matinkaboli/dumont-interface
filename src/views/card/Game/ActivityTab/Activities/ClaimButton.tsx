import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { openDialog } from '@/redux/features/dialogSlice';
import GAME_ABI from '@/abis/GAME_ABI.json';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';

import ClaimWin from './ClaimWin';
import ClaimedWin from './ClaimedWin';

interface Props {
  cardIndex: number;
  gameAddress?: `0x${string}`;
  refetch?: () => Promise<void>;
}

const ClaimButton = ({ gameAddress, cardIndex, refetch }: Props) => {
  const dispatch = useDispatch();

  const {
    writeContract: writeClaim,
    data: hash,
    isPending: isClaimLoading,
    isError: isWriteClaimError,
  } = useWriteContract();

  const { isSuccess: isConfirmed, isError: isWaitClaimError } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isClaimLoading) {
      dispatch(
        openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: (
            <AnimatedDialogContent key="loading">
              <LoadingContent title="Waiting for the network" desc="It will take a few seconds" />
            </AnimatedDialogContent>
          ),
        }),
      );
    }
  }, [isClaimLoading]);

  useEffect(() => {
    if (isWriteClaimError || isWaitClaimError) onError();
  }, [isWriteClaimError, isWaitClaimError]);

  useEffect(() => {
    if (isConfirmed) onSuccess();
  }, [isConfirmed]);

  function onClaim() {
    writeClaim?.({
      address: gameAddress!,
      abi: GAME_ABI,
      functionName: 'claimWin',
      args: [cardIndex],
    });
  }

  function onSuccess() {
    refetch?.();

    dispatch(
      openDialog({
        content: <ClaimedWin />,
      }),
    );
  }

  function onError() {
    dispatch(
      openDialog({
        content: (
          <AnimatedDialogContent key="error">
            <ErrorContent title="Claim was unsuccessful" onClick={onClaim} />
          </AnimatedDialogContent>
        ),
      }),
    );
  }

  function onOpenDialog() {
    dispatch(
      openDialog({
        content: <ClaimWin onClaim={onClaim} />,
      }),
    );
  }

  return (
    <button
      type="button"
      className="flex items-center gap-0.5 text-primary-200"
      onClick={onOpenDialog}
    >
      Claim
    </button>
  );
};

export default ClaimButton;
