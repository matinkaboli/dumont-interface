import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import clsx from 'clsx';

import { openDialog } from '@/redux/features/dialogSlice';
import { postGuessedCard } from '@/redux/features/betSlice';
import { AppDispatch } from '@/redux/store';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import GAME_ABI from '@/abis/GAME_ABI.json';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';

import KeyButton from '../KeyButton';
import ConfirmReveal from './ConfirmReveal';
import RevealedCard from './RevealedCard';

const RevealKey = ({ className }: { className?: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { details } = useTypedSelector((state) => state.config);
  const { data: game, leakedCount, activeCardIndex } = useTypedSelector((state) => state.game);

  const {
    write: writeRevealCard,
    data: revealCardData,
    isLoading: isRevealCardLoading,
  } = useContractWrite({
    address: game?.address,
    abi: GAME_ABI,
    functionName: 'requestFreeRevealCard',
    args: [activeCardIndex - 1],
    onError: onError,
  });

  useWaitForTransaction({
    chainId: details?.networkId,
    hash: revealCardData?.hash,
    onSuccess: onRevealCardSuccess,
    onError: onError,
  });

  useEffect(() => {
    if (isRevealCardLoading) {
      dispatch(
        openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: (
            <AnimatedDialogContent key="loading">
              <LoadingContent title="Waiting for the network" desc="This may take a few seconds" />
            </AnimatedDialogContent>
          ),
        }),
      );
    }
  }, [isRevealCardLoading]);

  function onRequestFreeRevealCard() {
    writeRevealCard?.();
  }

  function onRevealCardSuccess() {
    dispatch(
      postGuessedCard({
        id: game!.id,
        body: { index: activeCardIndex - 1 },
      }),
    )
      .unwrap()
      .then(() => {
        dispatch(
          openDialog({
            content: (
              <AnimatedDialogContent key="reveal">
                <RevealedCard />
              </AnimatedDialogContent>
            ),
          }),
        );
      })
      .catch(() => {
        onError();
      })
  }

  function onError() {
    dispatch(
      openDialog({
        content: (
          <AnimatedDialogContent key="error">
            <ErrorContent title="Reveal was unsuccessful" onClick={onRequestFreeRevealCard} />
          </AnimatedDialogContent>
        ),
      }),
    );
  }

  function onReveal() {
    dispatch(
      openDialog({
        content: <ConfirmReveal onReveal={onRequestFreeRevealCard} />,
      }),
    );
  }

  return (
    <KeyButton
      className="flex flex-col gap-0.5 disabled:bg-neutral-800 disabled:border-neutral-750 [&>div]:disabled:text-neutral-500"
      borderClassName={clsx('col-span-2', className)}
      onClick={onReveal}
      disabled={!game?.id || game.cards[activeCardIndex]?.isFreeReveal}
    >
      <div className="text-md text-white font-bold">Reveal {`->`}</div>
      <div className="text-neutral-500 text-sm">{leakedCount} / 3 remaining</div>
    </KeyButton>
  );
};

export default RevealKey;
