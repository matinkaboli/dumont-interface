import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import BN from 'bignumber.js';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

import { AppDispatch } from '@/redux/store';
import { openDialog } from '@/redux/features/dialogSlice';
import { postGuessedCard } from '@/redux/features/betSlice';
import transformedRanks from '@/helpers/transformedRanks';
import guessArrayToNumber from '@/helpers/guessArrayToNumber';
import formatUnits from '@/helpers/formatUnits';
import { useApproval } from '@/hooks/useApproval';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import GAME_ABI from '@/abis/GAME_ABI.json';

import ConfirmBet from '@/views/_components/Board/Amount/ConfirmBet';
import Approve from '@/views/Home/Create/ConfirmRound/Approve';
import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';
import ResultMessage from '@/views/_components/Board/Amount/ConfirmBet/ConfirmProcess/ResultMessage';

import KeyBoard from './KeyBoard';
import Amount from './Amount';

export interface BetData {
  amount: string;
  keys: string[];
}

const Board = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [betData, setBetData] = useState<BetData>({ amount: '', keys: [] });
  const { details } = useTypedSelector((state) => state.config);
  const { data: game, activeCardIndex } = useTypedSelector((state) => state.game);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isDirty, isValid, errors },
  } = useForm<BetData>({
    mode: 'onChange',
    defaultValues: {
      amount: '',
      keys: [],
    },
  });

  const { allowanceData, onApprove, isApproveLoading } = useApproval(
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

  useWaitForTransaction({
    chainId: details?.networkId,
    hash: guessCardData?.hash,
    onSuccess: onGuessCardSuccess,
    onError: onError,
  });

  useEffect(() => {
    if (isGuessCardLoading || isApproveLoading) {
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
  }, [isGuessCardLoading, isApproveLoading]);

  function onApproveSuccess() {
    dispatch(
      openDialog({
        content: <ConfirmBet bet={betData} onConfirm={() => onConfirmBet(betData)} />,
      }),
    );
  }

  function onGuessCardSuccess() {
    dispatch(
      postGuessedCard({
        id: game!.id,
        body: { cardIndex: activeCardIndex - 1 },
      }),
    )
      .unwrap()
      .then(() => {
        dispatch(
          openDialog({
            content: (
              <AnimatedDialogContent key="result">
                <ResultMessage />
              </AnimatedDialogContent>
            ),
          }),
        );
      })
      .catch(() => {
        onError();
      });
  }

  function onError() {
    dispatch(
      openDialog({
        content: <AnimatedDialogContent key="error">Something went wrong!</AnimatedDialogContent>,
      }),
    );
  }

  const onConfirmBet = (data: BetData) => {
    const keys = transformedRanks(data.keys);
    const guessNumber = guessArrayToNumber(keys);
    const amount = formatUnits(data.amount, 6).toNumber();
    writeGuessCard?.({ args: [activeCardIndex - 1, amount, guessNumber] });
  };

  const onBet = (data: BetData) => {
    const isApproved = new BN(allowanceData as string).isGreaterThanOrEqualTo(
      formatUnits(data.amount, 6),
    );

    dispatch(
      openDialog({
        content: isApproved ? (
          <ConfirmBet bet={data} onConfirm={() => onConfirmBet(data)} />
        ) : (
          <Approve onApprove={() => onApprove(data.amount)} />
        ),
      }),
    );
  };

  const onSubmit: SubmitHandler<BetData> = (data) => {
    if (data.amount) {
      setBetData(data);
      onBet(data);
    }
  };

  // <AnimatedDialogContent key="verification">
  //    <VerificationOperation />
  //  </AnimatedDialogContent>

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid md:grid-cols-3 grid-cols-1 md:gap-x-4 gap-x-0 md:gap-y-0 gap-y-4"
    >
      <div className="col-span-2 md:order-1 order-2">
        <KeyBoard setValue={setValue} />
      </div>
      <div className="col-span-1 md:order-2 order-1">
        <Amount inputErrors={errors} control={control} disabledButton={!isValid || !isDirty} />
      </div>
    </form>
  );
};

export default Board;
