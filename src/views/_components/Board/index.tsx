import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import BN from 'bignumber.js';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { swiperRef } from '@/components';
import { AppDispatch } from '@/redux/store';
import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import { postGuessedCard } from '@/redux/features/betSlice';
import { Card, getGame } from '@/redux/features/gameSlice';
import transformedRanks from '@/helpers/transformedRanks';
import transformRanks from '@/helpers/transformedRanks';
import guessArrayToNumber from '@/helpers/guessArrayToNumber';
import formatUnits from '@/helpers/formatUnits';
import isEmpty from '@/helpers/isEmpty';
import formatDecimal from '@/helpers/formatDecimal';
import humanizeAmount from '@/helpers/humanizeAmount';
import { useApproval } from '@/hooks/useApproval';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import GAME_ABI from '@/abis/GAME_ABI.json';

import ApproveAllowance from '@/views/_components/Dialog/ApproveAllowance';
import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';

import KeyBoard from './KeyBoard';
import Amount from './Amount';
import ConfirmBet from './ConfirmBet';
import ResultMessage from './ConfirmBet/ResultMessage';

export const TOTAL_CARDS_LENGTH = 52;

const calculateTotalOdds = (
  keys: string[],
  cardOccurrences: { [key: string]: number },
  cardsLength: number,
) => {
  if (keys.length === 0) return 0;

  const transformedKeys = transformRanks(keys);
  const total = transformedKeys.reduce((sum, key) => sum + (cardOccurrences[key] || 0), 0);

  const result = (TOTAL_CARDS_LENGTH - cardsLength) / total;
  return formatDecimal({ amount: result, decimalPlaces: 2 });
};

const useCardData = () => {
  const { data: game, activeCardIndex, isExpired } = useTypedSelector((state) => state.game);

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

  return { game, activeCardIndex, isExpired, validCardNumbers, cardOccurrences };
};

export interface BetData {
  amount: string;
  keys: string[];
}

const Board = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { address } = useTypedSelector((state) => state.account.profile);
  const { game, activeCardIndex, isExpired, validCardNumbers, cardOccurrences } = useCardData();
  const [betData, setBetData] = useState<BetData>({ amount: '', keys: [] });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    trigger,
    formState: { isDirty, isValid, errors },
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
  const formattedPayout = humanizeAmount(
    formatDecimal({ amount: +amount * totalOdds, decimalPlaces: 2 }),
  );

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
    if (isGuessCardLoading || isApproveLoading || isWaitGuessCardLoading) {
      let title = isGuessCardLoading ? 'Sign the transaction' : 'Waiting for the network';
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
  }, [isGuessCardLoading, isApproveLoading, isWaitGuessCardLoading]);

  useEffect(() => {
    if (isConfirmed) onGuessCardSuccess();
  }, [isConfirmed]);

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
    dispatch(getGame(game!.id))
      .unwrap()
      .then(() => {
        reset();
        dispatch(closeDialog());
        // @ts-ignore
        swiperRef?.current?.slideNext();
      });
  }

  function onCloseConfirmBet() {
    refetchAllowance();
    dispatch(closeDialog());
  }

  function onGuessCardSuccess() {
    refetchAllowance();

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
            dialogProps: {
              onCloseButton: onCloseResultDialog,
              onClickOverlay: onCloseResultDialog,
            },
            content: (
              <AnimatedDialogContent key="result">
                <ResultMessage onCloseDialog={onCloseResultDialog} />
              </AnimatedDialogContent>
            ),
          }),
        );
      })
      .catch(() => {
        onError();
      });
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
    if (game?.player !== address) return 'Not your game';
    if (game?.cards[activeCardIndex - 1]?.number !== -1) return 'Revealed Card';
    return 'Bet';
  }

  const isDisabled =
    !isValid ||
    !isDirty ||
    isEmpty(keys) ||
    isExpired ||
    game?.cards[activeCardIndex - 1]?.number !== -1 ||
    game?.player !== address;

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
          disabledButton={isDisabled}
          disabledButtonLabel={disabledButtonLabel()}
        />
      </div>
    </form>
  );
};
export default Board;
