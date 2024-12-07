import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import BN from 'bignumber.js';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { swiperRef } from '@/components/Carousel';
import { AppDispatch } from '@/redux/store';
import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import { Card, GameData, getGame } from '@/redux/features/gameSlice';
import { showConfetti } from '@/redux/features/confettiSlice';
import transformedRanks from '@/helpers/transformedRanks';
import transformRanks from '@/helpers/transformedRanks';
import guessArrayToNumber from '@/helpers/guessArrayToNumber';
import formatUnits from '@/helpers/formatUnits';
import isEmpty from '@/helpers/isEmpty';
import formatDecimal from '@/helpers/formatDecimal';
import { useApproval } from '@/hooks/useApproval';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import GAME_ABI from '@/abis/GAME_ABI.json';
import { MAX_GUESSABLE_CARDS, TOTAL_CARDS_LENGTH } from '@/constants/static';

import ApproveAllowance from '@/views/_components/Dialog/ApproveAllowance';
import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';

import KeyBoard from './KeyBoard';
import Amount from './Amount';
import ConfirmBet from './ConfirmBet';
import ResultMessage from './ConfirmBet/ResultMessage';

const calculateTotalOdds = (
  keys: string[],
  cardOccurrences: { [key: string]: number },
  cardsLength: number,
) => {
  if (keys.length === 0) return 0;

  const transformedKeys = transformRanks(keys);
  const total = transformedKeys.reduce((sum, key) => sum + (cardOccurrences[key] || 0), 0);

  const result = (TOTAL_CARDS_LENGTH - cardsLength) / total;

  return result;
};

const useCardData = () => {
  const {
    data: game,
    activeCardIndex,
    isExpired,
    guessedCardsCount,
    areAllCardsGuessed,
  } = useTypedSelector((state) => state.game);

  const validCardNumbers = useMemo(
    () =>
      game?.cards.filter((card: Card) => card.number !== -1).map((card: Card) => card.number) || [],
    [game?.cards],
  );

  const cardOccurrences = useMemo(() => {
    const obj: { [key: string]: number } = Object.fromEntries(
      Array.from({ length: 13 }, (_, i) => [i.toString(), 4]),
    );
    validCardNumbers.forEach((number) => {
      obj[(number % 13).toString()]--;
    });
    return obj;
  }, [validCardNumbers]);

  return {
    game,
    isExpired,
    activeCardIndex,
    cardOccurrences,
    validCardNumbers,
    guessedCardsCount,
    areAllCardsGuessed,
  };
};

export interface BetData {
  amount: string;
  keys: string[];
}

const Board = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isGuessResLoading, setIsGuessResLoading] = useState(false);
  const { address } = useTypedSelector((state) => state.account.profile);
  const {
    game,
    activeCardIndex,
    isExpired,
    areAllCardsGuessed,
    guessedCardsCount,
    validCardNumbers,
    cardOccurrences,
  } = useCardData();
  const [betData, setBetData] = useState<BetData>({ amount: '', keys: [] });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    trigger,
    formState: { isDirty, isValid, errors, touchedFields },
  } = useForm<BetData>({
    mode: 'onChange',
    defaultValues: {
      amount: '',
      keys: [],
    },
  });

  const keys = watch('keys');
  const amount = watch('amount');

  const totalOdds = calculateTotalOdds(keys, cardOccurrences, validCardNumbers.length);

  const totalAmount = Number(amount) * totalOdds;

  const formattedPayout = formatDecimal({ amount: totalAmount, decimalPlaces: 2 });

  const { allowanceData, sendApprove, isApproveLoading, refetchAllowance } = useApproval(
    game?.address,
    onApproveSuccess,
    onError,
  );

  const {
    writeContract: writeGuessCard,
    data: guessCardData,
    isPending: isGuessCardLoading,
    isError: isWriteGuessError,
  } = useWriteContract();

  const {
    isLoading: isWaitGuessCardLoading,
    isSuccess: isConfirmed,
    isError: isWaitGuessError,
  } = useWaitForTransactionReceipt({
    hash: guessCardData,
  });

  useEffect(() => {
    if (isGuessCardLoading || isApproveLoading || isWaitGuessCardLoading || isGuessResLoading) {
      let title =
        isGuessCardLoading ? 'Sign the transaction' : 'Waiting for the network';
      let desc = isGuessCardLoading
        ? 'Sign this transaction in your wallet'
        : 'It will take a few seconds';

      dispatch(
        openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: (
            <AnimatedDialogContent key="loading">
              <LoadingContent title={title} desc={desc} />
            </AnimatedDialogContent>
          ),
        }),
      );
    }
  }, [isGuessCardLoading, isApproveLoading, isWaitGuessCardLoading, isGuessResLoading]);

  useEffect(() => {
    if (isConfirmed) {
      let pollInterval: NodeJS.Timeout;
      setIsGuessResLoading(true);

      const onGuessCardSuccess = () => {
        refetchAllowance();

        dispatch(getGame(game!.id))
          .unwrap()
          .then((game: GameData) => {
            if (game.cards[activeCardIndex - 1].number !== -1) {
              setIsGuessResLoading(false);

              dispatch(
                openDialog({
                  dialogProps: {
                    onCloseButton: onCloseResultDialog,
                    onClickOverlay: onCloseResultDialog,
                  },
                  content: (
                    <AnimatedDialogContent key="result">
                      <ResultMessage
                        cardIndex={activeCardIndex - 1}
                        onCloseDialog={onCloseResultDialog}
                      />
                    </AnimatedDialogContent>
                  ),
                }),
              );

              if (pollInterval) {
                clearInterval(pollInterval);
              }
            }
          });
      };

      onGuessCardSuccess(); // Initial fetch

      pollInterval = setInterval(onGuessCardSuccess, 300); // Set up polling if not yet revealed

      return () => {
        if (pollInterval) {
          clearInterval(pollInterval);
        }
      };
    }
  }, [isConfirmed]);

  useEffect(() => {
    if(game) {
      const currentCard = game.cards[activeCardIndex - 1];
      const result = currentCard?.result;

      const isPlayerWinner = result?.isPlayerWinner && !currentCard.isFreeReveal;

      if (isPlayerWinner) dispatch(showConfetti({ confettiProps: { key: currentCard.number } }));
    }
  }, [game]);

  useEffect(() => {
    if (isWriteGuessError || isWaitGuessError) onError();
  }, [isWriteGuessError, isWaitGuessError]);

  function onApproveSuccess() {
    dispatch(
      openDialog({
        dialogProps: {
          onCloseButton: onCloseConfirmBet,
          onClickOverlay: onCloseConfirmBet,
        },
        content: (
          <ConfirmBet
            bet={betData}
            totalOdds={totalOdds}
            payout={formattedPayout}
            onConfirm={() => onConfirmBet(betData)}
          />
        ),
      }),
    );
  }

  function onCloseResultDialog() {
    reset();
    dispatch(closeDialog());
    if (guessedCardsCount < MAX_GUESSABLE_CARDS - 1) {
      // @ts-ignore
      swiperRef?.current?.slideNext();
    }
  }

  function onCloseConfirmBet() {
    refetchAllowance();
    dispatch(closeDialog());
  }

  function onConfirmBet(data: BetData) {
    const keys = transformedRanks(data.keys);
    const guessNumber = guessArrayToNumber(keys);
    const amount = formatUnits(data.amount, 6).toNumber();
    writeGuessCard?.({
      address: game!.address,
      abi: GAME_ABI,
      functionName: 'guessCard',
      args: [activeCardIndex - 1, amount, guessNumber],
    });
  }

  function onBet(data: BetData) {
    const isApproved = new BN(allowanceData as string).isGreaterThanOrEqualTo(
      formatUnits(data.amount, 6),
    );

    dispatch(
      openDialog({
        dialogProps: {
          onCloseButton: onCloseConfirmBet,
          onClickOverlay: onCloseConfirmBet,
        },
        content: isApproved ? (
          <ConfirmBet
            bet={data}
            totalOdds={totalOdds}
            payout={formattedPayout}
            onConfirm={() => onConfirmBet(data)}
          />
        ) : (
          <ApproveAllowance onApprove={() => sendApprove(data.amount)} />
        ),
      }),
    );
  }

  function onError() {
    dispatch(
      openDialog({
        content: (
          <AnimatedDialogContent key="error">
            <ErrorContent title="Bet was unsuccessful" onClick={() => onConfirmBet(betData)} />
          </AnimatedDialogContent>
        ),
      }),
    );
  }

  function onSubmit(data: BetData) {
    if (!data.amount) return;

    setBetData(data);
    onBet(data);
  }

  function disabledButtonLabel() {
    if (!game) return 'Bet';

    const card = game.cards?.[activeCardIndex - 1];
    const isPlayerGame = game.player.toLowerCase() === address?.toLowerCase();
    const isCardNumberDefined = card?.number !== undefined;
    const isCardRevealed = isCardNumberDefined && card.number !== -1;

    if (areAllCardsGuessed) return 'Round is ended';
    if (isExpired) return 'Round is expired';
    if (!isPlayerGame) return 'Not your game';
    if (!isCardNumberDefined) return 'Card not available';
    if (isCardRevealed) return 'Revealed Card';

    return 'Bet';
  }

  const isDisabled =
    !isValid ||
    !isDirty ||
    isEmpty(keys) ||
    isExpired ||
    game?.cards[activeCardIndex - 1]?.number !== -1 ||
    game?.player.toLowerCase() !== address?.toLowerCase();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid md:grid-cols-3 grid-cols-1 md:gap-x-4 gap-x-0 md:gap-y-0 gap-y-4"
    >
      <div className="col-span-2 md:order-1 order-2">
        <KeyBoard
          values={keys}
          setValue={setValue}
          validCardNumbersLength={validCardNumbers.length}
          cardOccurrences={cardOccurrences}
        />
      </div>
      <div className="col-span-1 md:order-2 order-1">
        <Amount
          payout={formattedPayout}
          totalOdds={totalOdds}
          setValue={setValue}
          inputErrors={errors}
          control={control}
          trigger={trigger}
          touchedFields={touchedFields}
          disabledButton={isDisabled}
          disabledButtonLabel={disabledButtonLabel()}
        />
      </div>
    </form>
  );
};
export default Board;
