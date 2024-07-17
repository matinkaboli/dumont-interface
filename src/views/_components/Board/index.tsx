import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import BN from 'bignumber.js';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

import { swiperRef } from '@/components';
import { AppDispatch } from '@/redux/store';
import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import { postGuessedCard } from '@/redux/features/betSlice';
import { Card, getGame } from '@/redux/features/gameSlice';
import transformedRanks from '@/helpers/transformedRanks';
import guessArrayToNumber from '@/helpers/guessArrayToNumber';
import formatUnits from '@/helpers/formatUnits';
import isEmpty from '@/helpers/isEmpty';
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

export const TOTAL_CARDS_LENGTH = 52;

export interface BetData {
  amount: string;
  keys: string[];
}

const Board = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { details } = useTypedSelector((state) => state.config);
  const { game, activeCardIndex, isExpired, validCardNumbers, cardOccurrences } = useCardData();
  const [betData, setBetData] = useState<BetData>({ amount: '', keys: [] });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { isDirty, isValid, errors },
  } = useForm<BetData>({
    mode: 'onChange',
    defaultValues: {
      amount: '',
      keys: [],
    },
  });

  const { allowanceData, sendApprove, isApproveLoading, refetchAllowance } = useApproval(
    game?.address,
    onApproveSuccess,
    onError,
  );

  const {
    write: writeGuessCard,
    data: guessCardData,
    isLoading: isGuessCardLoading,
  } = useContractWrite({
    address: game?.address as any,
    abi: GAME_ABI,
    functionName: 'guessCard',
    onError: onError,
  });

  const { isLoading: isWaitGuessCardLoading } = useWaitForTransaction({
    chainId: details?.networkId,
    hash: guessCardData?.hash,
    onSuccess: onGuessCardSuccess,
    onError: onError,
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

  function onApproveSuccess() {
    dispatch(
      openDialog({
        content: <ConfirmBet bet={betData} onConfirm={() => onConfirmBet(betData)} />,
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
    writeGuessCard?.({ args: [activeCardIndex - 1, amount, guessNumber] });
  }

  function onBet(data: BetData) {
    const isApproved = new BN(allowanceData as string).isGreaterThanOrEqualTo(
      formatUnits(data.amount, 6),
    );

    dispatch(
      openDialog({
        content: isApproved ? (
          <ConfirmBet bet={data} onConfirm={() => onConfirmBet(data)} />
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
    if (data.amount) {
      setBetData(data);
      onBet(data);
    }
  }

  const keys = watch('keys');
  const amount = watch('amount');

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
          amount={amount}
          keys={keys}
          setValue={setValue}
          inputErrors={errors}
          control={control}
          validCardNumbersLength={validCardNumbers.length}
          cardOccurrences={cardOccurrences}
          disabledButton={
            !isValid ||
            !isDirty ||
            isEmpty(keys) ||
            isExpired ||
            game?.cards[activeCardIndex - 1]?.number !== -1
          }
        />
      </div>
    </form>
  );
};

export default Board;
