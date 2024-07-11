import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

import { openDialog } from '@/redux/features/dialogSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import GAME_ABI from '@/abis/GAME_ABI.json';
import { Icon } from '@/components';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';

import ClaimWin from './ClaimWin';
import ClaimedWin from './ClaimedWin';

interface Props {
  cardIndex: number;
  gameAddress?: `0x${string}`;
}

const ClaimButton = ({ gameAddress, cardIndex }: Props) => {
  const dispatch = useDispatch();
  const { details } = useTypedSelector((state) => state.config);

  const {
    write: writeClaim,
    data: claimData,
    isLoading: isClaimLoading,
  } = useContractWrite({
    address: gameAddress,
    abi: GAME_ABI,
    functionName: 'claimWin',
    args: [cardIndex],
    onError: onError,
  });

  useWaitForTransaction({
    chainId: details?.networkId,
    hash: claimData?.hash,
    onSuccess: onSuccess,
    onError: onError,
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

  function onClaim() {
    writeClaim?.();
  }

  function onSuccess() {
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
      className="flex items-center gap-0.5 text-primary-250"
      onClick={onOpenDialog}
    >
      Claim
      <Icon name="angle-right" width="16" height="16" color="#EA00FF" />
    </button>
  );
};

export default ClaimButton;
