import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import BN from 'bignumber.js';

import { Button } from '@/components';
import { closeDialog, openDialog, updateDialogContent } from '@/redux/features/dialogSlice';
import { AppDispatch } from '@/redux/store';
import { postGame } from '@/redux/features/gameSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useApproval } from '@/hooks/useApproval';
import extractGameId from '@/helpers/extractGameId';
import GAME_FACTORY_ABI from '@/abis/GAME_FACTORY_ABI.json';
import formatUnits from '@/helpers/formatUnits';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';
import LongLoadingContent from '@/views/_components/Dialog/LongLoadingContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';

import Confirm from './Confirm';
import Approve from './Approve';

const approveValue = '1';

const ConfirmRound = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { details } = useTypedSelector((state) => state.config);
  const [redirectId, setRedirectId] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0); // The active index corresponds to the index in the long loading array.
  const { allowanceData, onApprove, isApproveLoading } = useApproval(
    details?.gameFactory,
    onApproveSuccess,
    onApproveError,
  );

  const {
    write: writeCreateGame,
    data: createGameData,
    isLoading: isCreateGameLoading,
  } = useContractWrite({
    address: details?.gameFactory,
    abi: GAME_FACTORY_ABI,
    functionName: 'createGame',
    args: ['0x0000000000000000000000000000000000000000'],
    onError: () => onError('Creating was unsuccessful', onCreateGame),
    onSuccess: () => setActiveIndex(1),
  });

  useWaitForTransaction({
    chainId: details?.networkId,
    hash: createGameData?.hash,
    onSuccess: onCreateGameSuccess,
    onSettled: onCreateGameSettled,
    onError: () => onError('Creating was unsuccessful', onCreateGame),
  });

  useEffect(() => {
    if (isApproveLoading || isCreateGameLoading) {
      dispatch(
        openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: (
            <AnimatedDialogContent key="loading">
              {isApproveLoading ? (
                <LoadingContent title="Waiting for the network" desc="It will take a few seconds" />
              ) : (
                <LongLoadingContent activeIndex={activeIndex} />
              )}
            </AnimatedDialogContent>
          ),
        }),
      );
    }
  }, [isApproveLoading, isCreateGameLoading, dispatch]);

  useEffect(() => {
    dispatch(
      updateDialogContent(
        <AnimatedDialogContent key="loading">
          <LongLoadingContent activeIndex={activeIndex} />
        </AnimatedDialogContent>,
      ),
    );

    if (activeIndex === 3) {
      const timer = setTimeout(() => {
        setActiveIndex(4);
      }, 2000);

      return () => clearTimeout(timer);
    } else if (activeIndex === 4) {
      const redirectTimer = setTimeout(() => {
        dispatch(closeDialog());
        router.push(`/${redirectId}`);
      }, 1000);

      return () => clearTimeout(redirectTimer);
    }
  }, [activeIndex]);

  function onApproveSuccess() {
    dispatch(
      openDialog({
        dialogProps: { showCloseButton: false, disableEvents: true },
        content: (
          <AnimatedDialogContent key="confirm">
            <Confirm onCreateGame={onCreateGame} />
          </AnimatedDialogContent>
        ),
      }),
    );
  }

  function onCreateGameSuccess() {
    setActiveIndex(2);
  }

  function onCreateGameSettled(data: any) {
    if (data) {
      const id = extractGameId(data.logs);

      setRedirectId(id);

      dispatch(postGame({ id }))
        .unwrap()
        .then(() => {
          setActiveIndex(3);
        })
        .catch(() => {
          onError('Creating was unsuccessful', onCreateGame);
        });
    }
  }

  function onError(title: string, func: () => void) {
    dispatch(
      openDialog({
        content: (
          <AnimatedDialogContent key="error">
            <ErrorContent title={title} onClick={func} />
          </AnimatedDialogContent>
        ),
      }),
    );
  }

  function onApproveError() {
    onError('Approve was unsuccessful', () => onApprove(approveValue));
  }

  const onCreateGame = () => writeCreateGame?.();

  const onCreateRound = () => {
    const isApproved = new BN(allowanceData as string).isGreaterThanOrEqualTo(
      formatUnits(approveValue, 6),
    );

    dispatch(
      openDialog({
        content: isApproved ? (
          <Confirm onCreateGame={onCreateGame} />
        ) : (
          <Approve onApprove={() => onApprove('1')} />
        ),
      }),
    );
  };

  return (
    <Button
      variant="primary"
      size="sm"
      radius="lg"
      onClick={onCreateRound}
      className="mt-4 mx-auto !font-bold md:w-auto w-full"
    >
      Create Round
    </Button>
  );
};

export default ConfirmRound;
