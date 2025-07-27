import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useWaitForTransactionReceipt } from 'wagmi';
import { encodeFunctionData } from 'viem';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';

import { swiperRef } from '@/components/Carousel';
import { AppDispatch } from '@/redux/store';
import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import { getGame } from '@/redux/features/faro/faroSlice';
import { Card, Faro } from '@/types/faro';
import { showConfetti } from '@/redux/features/confettiSlice';
import transformedRanks from '@/helpers/transformedRanks';
import transformRanks from '@/helpers/transformedRanks';
import guessArrayToNumber from '@/helpers/guessArrayToNumber';
import formatUnits from '@/helpers/formatUnits';
import isEmpty from '@/helpers/isEmpty';
import formatDecimal from '@/helpers/formatDecimal';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { usePolling } from '@/hooks/usePolling';
import ERC20_ABI from '@/abis/ERC20_ABI.json';
import { TOTAL_CARDS_LENGTH } from '@/constants/static';
import GATEWAY_ABI from '@/abis/GATEWAY_ABI.json';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';

import ResultMessage from './ConfirmBet/ResultMessage';
import KeyBoard from './KeyBoard';
import Amount from './Amount';
import ConfirmBet from './ConfirmBet';

const calculateTotalOdds = (
  keys: string[],
  cardOccurrences: { [key: string]: number },
  cardsLength: number,
) => {
  if (keys.length === 0) return 0;

  const transformedKeys = transformRanks(keys);
  const total = transformedKeys.reduce((sum, key) => sum + (cardOccurrences[key] || 0), 0);

  return (TOTAL_CARDS_LENGTH - cardsLength) / total;
};

const useCardData = () => {
  const {
    data: game,
    activeCardIndex,
    isExpired,
    guessedCardsCount,
    areAllCardsGuessed,
  } = useTypedSelector((state) => state.faro.main);

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
  const { address } = useTypedSelector((state) => state.account.profile);
  const { details } = useTypedSelector((state) => state.config);
  const { client } = useSmartWallets();
  const [isGuessCardLoading, setIsGuessCardLoading] = useState(false);
  const [guessCardTx, setGuessCardTx] = useState('');
  const {
    game,
    activeCardIndex,
    isExpired,
    areAllCardsGuessed,
    validCardNumbers,
    cardOccurrences,
  } = useCardData();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    trigger,
    resetField,
    formState: { isDirty, isValid, isSubmitted, errors, touchedFields },
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

  const { isLoading: isWaitTXLoading, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: guessCardTx as `0x${string}`,
  });

  const isGuessCardConfirming = usePolling(
    isConfirmed,
    () => dispatch(getGame(game!.id)).unwrap(),
    (game: Faro) => {
      const cardRevealed = game.cards[activeCardIndex - 1].number !== -1;

      if (cardRevealed) {
        dispatch(
          openDialog({
            dialogProps: {
              onCloseButton: onCloseResultDialog,
              onClickOverlay: onCloseResultDialog,
            },
            content: (
              <AnimatedDialogContent key='result'>
                <ResultMessage
                  cardIndex={activeCardIndex - 1}
                  onCloseDialog={onCloseResultDialog}
                />
              </AnimatedDialogContent>
            ),
          }),
        );
      }

      return cardRevealed;
    },
  );

  useEffect(() => {
    if (game) {
      const currentCard = game.cards[activeCardIndex - 1];
      const result = currentCard?.result;

      const isPlayerWinner = result?.isPlayerWinner && !currentCard.isFreeReveal;

      if (isPlayerWinner) dispatch(showConfetti({ confettiProps: { key: currentCard.number } }));
    }
  }, [game]);

  useEffect(() => {
    if (isGuessCardLoading || isWaitTXLoading) {
      dispatch(
        openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: (
            <AnimatedDialogContent key='loading'>
              <LoadingContent title='Waiting for the network' desc='It will take a few seconds' />
            </AnimatedDialogContent>
          ),
        }),
      );
    }
  }, [isGuessCardLoading, isWaitTXLoading]);

  const onGuessCard = async (data: BetData) => {
    const keys = transformedRanks(data.keys);
    const guessNumber = guessArrayToNumber(keys);
    const amount = formatUnits(data.amount, 6).toNumber();

    setIsGuessCardLoading(true);
    setGuessCardTx('');

    if (!client) return;

    try {
      const tx = await client.sendTransaction({
        account: client.account,
        calls: [
          {
            to: details!.usdc,
            data: encodeFunctionData({
              abi: ERC20_ABI,
              functionName: 'approve',
              args: [details!.gateway, amount.toString()],
            }),
          },
          {
            to: details!.gateway,
            data: encodeFunctionData({
              abi: GATEWAY_ABI,
              functionName: 'guessCard',
              args: [game!.id, activeCardIndex - 1, amount, guessNumber],
            }),
          },
        ],
      });

      setGuessCardTx(tx);
    } catch (error) {
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
    setIsGuessCardLoading(false);
  };

  const onSubmit = (data: BetData) => {
    if (!data.amount) return;

    dispatch(
      openDialog({
        content: (
          <ConfirmBet
            bet={data}
            totalOdds={totalOdds}
            payout={formattedPayout}
            onConfirm={() => onGuessCard(data)}
          />
        ),
      }),
    );
  };

  const onCloseResultDialog = () => {
    reset();
    dispatch(closeDialog());
    // @ts-ignore
    swiperRef?.current?.slideNext();
  };

  const disabledButtonLabel = () => {
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
  };

  const isButtonDisabled =
    isEmpty(keys) ||
    isGuessCardLoading ||
    isGuessCardConfirming ||
    isWaitTXLoading ||
    isExpired ||
    game?.cards[activeCardIndex - 1]?.number !== -1 ||
    game?.player.toLowerCase() !== address?.toLowerCase();

  const isFormValid = !isValid || !isDirty || isButtonDisabled;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid md:grid-cols-3 grid-cols-1 md:gap-x-4 gap-x-0 md:gap-y-0 gap-y-4'
    >
      <div className='col-span-2 md:order-1 order-2'>
        <KeyBoard
          values={keys}
          setValue={setValue}
          validCardNumbersLength={validCardNumbers.length}
          cardOccurrences={cardOccurrences}
        />
      </div>
      <div className='col-span-1 md:order-2 order-1'>
        <Amount
          payout={formattedPayout}
          totalOdds={totalOdds}
          setValue={setValue}
          inputErrors={errors}
          control={control}
          trigger={trigger}
          touchedFields={touchedFields}
          isFormValid={isFormValid}
          isButtonDisabled={isButtonDisabled}
          isSubmitted={isSubmitted}
          resetField={resetField}
          disabledButtonLabel={disabledButtonLabel()}
        />
      </div>
    </form>
  );
};
export default Board;
