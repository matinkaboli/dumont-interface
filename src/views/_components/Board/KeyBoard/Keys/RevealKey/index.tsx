import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import clsx from 'clsx';

import { swiperRef } from '@/components/Carousel';
import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import { GameData, getGame } from '@/redux/features/gameSlice';
import { AppDispatch } from '@/redux/store';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import isEmpty from '@/helpers/isEmpty';
import GAME_ABI from '@/abis/GAME_ABI.json';
import { MAX_GUESSABLE_CARDS } from '@/constants/static';
import { usePolling } from '@/hooks/usePolling';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';

import KeyButton from '../KeyButton';
import ConfirmReveal from './ConfirmReveal';
import RevealedCard from './RevealedCard';

const RevealKey = ({ className }: { className?: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  // const [isLoading, setIsLoading] = useState(false);
  const { address } = useTypedSelector((state) => state.account.profile);
  const {
    data: game,
    activeCardIndex,
    isExpired,
    guessedCardsCount,
  } = useTypedSelector((state) => state.game);

  const {
    writeContract: writeRevealCard,
    data: revealCardData,
    isPending: isRevealCardLoading,
    isError: isWriteRevealError,
  } = useWriteContract();

  const { isError: isWaitRevealError, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: revealCardData,
  });

  const isRevealLoading = usePolling(
    isConfirmed,
    () => dispatch(getGame(game!.id)).unwrap(),
    (game: GameData) => {
      const cardRevealed = game.cards[activeCardIndex - 1].number !== -1;

      if (cardRevealed) {
        dispatch(
          openDialog({
            dialogProps: {
              onCloseButton: onCloseDialog,
              onClickOverlay: onCloseDialog,
            },
            content: (
              <AnimatedDialogContent key="reveal">
                <RevealedCard
                  cardIndex={activeCardIndex - 1}
                  onCloseDialog={onCloseDialog}
                />
              </AnimatedDialogContent>
            ),
          })
        );
      }

      return cardRevealed;
    }
  );

  useEffect(() => {
    if (isRevealCardLoading || isRevealLoading) {
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
  }, [isRevealCardLoading, isRevealLoading]);

  useEffect(() => {
    if (isWriteRevealError || isWaitRevealError) onError();
  }, [isWriteRevealError, isWaitRevealError]);

  function onRequestFreeRevealCard() {
    writeRevealCard?.({
      address: game!.address,
      abi: GAME_ABI,
      functionName: 'requestFreeRevealCard',
      args: [activeCardIndex - 1],
    });
  }

  function onCloseDialog() {
    dispatch(closeDialog());
    if (guessedCardsCount < MAX_GUESSABLE_CARDS - 1) {
      // @ts-ignore
      swiperRef?.current?.slideNext();
    }
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
      className="flex flex-col gap-0.5 [&>div]:disabled:text-neutral-500"
      borderClassName={clsx('col-span-2', className)}
      onClick={onReveal}
      disabled={
        isEmpty(game) ||
        isExpired ||
        game?.player.toLowerCase() !== address?.toLowerCase() ||
        game!.cards[activeCardIndex - 1]?.isFreeReveal ||
        game?.cards[activeCardIndex - 1]?.number !== -1 ||
        +game!.freeRevealRequests === +game!.maxFreeReveals
      }
    >
      <div className="text-md text-white font-bold">Reveal {`->`}</div>
      {!isEmpty(game) ? (
        <div className="text-neutral-500 text-sm">
          {3 - (game?.freeRevealRequests || 0)} remaining
        </div>
      ) : null}
    </KeyButton>
  );
};

export default RevealKey;
