import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useWaitForTransactionReceipt } from 'wagmi';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';
import { encodeFunctionData } from 'viem';
import clsx from 'clsx';

import { swiperRef } from '@/components/Carousel';
import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import { GameData, getGame } from '@/redux/features/gameSlice';
import { AppDispatch } from '@/redux/store';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { usePolling } from '@/hooks/usePolling';
import isEmpty from '@/helpers/isEmpty';
import GAME_ABI from '@/abis/GAME_ABI.json';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';

import KeyButton from '../KeyButton';
import ConfirmReveal from './ConfirmReveal';
import RevealedCard from './RevealedCard';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';

const RevealKey = ({ className }: { className?: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { address } = useTypedSelector((state) => state.account.profile);
  const { data: game, activeCardIndex, isExpired } = useTypedSelector((state) => state.game);
  const { client } = useSmartWallets();
  const [isRevealCardLoading, setIsRevealCardLoading] = useState(false);
  const [revealCardTx, setRevealCardTx] = useState('');

  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: revealCardTx as `0x${string}`,
  });

  const isRevealConfirming = usePolling(
    isConfirmed,
    () => dispatch(getGame(game!.id)).unwrap(),
    (game: GameData) => {
      const cardRevealed = game.cards[activeCardIndex - 1].number !== -1;

      if (cardRevealed) {
        dispatch(
          openDialog({
            dialogProps: {
              onCloseButton: onCloseResultDialog,
              onClickOverlay: onCloseResultDialog,
            },
            content: (
              <AnimatedDialogContent key="reveal">
                <RevealedCard cardIndex={activeCardIndex - 1} onCloseDialog={onCloseResultDialog} />
              </AnimatedDialogContent>
            ),
          }),
        );
      }

      return cardRevealed;
    },
  );

  useEffect(() => {
    if(isRevealCardLoading) {
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
  }, [isRevealCardLoading]);

  const onCloseDialog = () => dispatch(closeDialog());

  const onCloseResultDialog = () => {
    // @ts-ignore
    swiperRef?.current?.slideNext();
    onCloseDialog();
  };

  const onRequestFreeRevealCard = async () => {
    onCloseDialog();

    setIsRevealCardLoading(true);
    setRevealCardTx('');

    if (!client) return;

    try {
      const tx = await client.sendTransaction({
        account: client.account,
        calls: [
          {
            to: game!.address,
            data: encodeFunctionData({
              abi: GAME_ABI,
              functionName: 'requestFreeRevealCard',
              args: [activeCardIndex - 1],
            }),
          },
        ],
      });
      setRevealCardTx(tx);
    } catch (error) {
      dispatch(
        openDialog({
          content: (
            <AnimatedDialogContent key="error">
              <ErrorContent title="Something went wrong" />
            </AnimatedDialogContent>
          ),
        }),
      );
    }
    setIsRevealCardLoading(false);
  };

  const onReveal = () => {
    dispatch(
      openDialog({
        content: <ConfirmReveal onReveal={onRequestFreeRevealCard} />,
      }),
    );
  };

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
        +game!.freeRevealRequests === +game!.maxFreeReveals ||
        isRevealCardLoading ||
        isRevealConfirming
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
