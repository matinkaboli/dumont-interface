import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { sepolia } from 'wagmi/chains';
import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import BN from 'bignumber.js';

import { Button } from '@/components';
import { closeDialog, openDialog, updateDialogContent } from '@/redux/features/dialogSlice';
import { AppDispatch } from '@/redux/store';
import { postGame } from '@/redux/features/gameSlice';
import contractAddresses from '@/constants/contractAddresses';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import formatUnits from '@/helpers/formatUnits';
import extractGameId from '@/helpers/extractGameId';
import ERC20_ABI from '@/abis/ERC20_ABI.json';
import GAME_FACTORY_ABI from '@/abis/GAME_FACTORY_ABI.json';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';
import LongLoadingContent from '@/views/_components/Dialog/LongLoadingContent';

import Confirm from './Confirm';
import Approve from './Approve';
import Error from './Error';

const ConfirmRound = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { address } = useTypedSelector((state) => state.account.profile);
  const [redirectId, setRedirectId] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0); // The active index corresponds to the index in the long loading array.

  const { data: allowanceData } = useContractRead({
    address: contractAddresses.erc20,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: [address, contractAddresses.gameFactory],
  });

  const {
    write: writeApprove,
    data: approveData,
    isLoading: isApproveLoading,
  } = useContractWrite({
    address: contractAddresses.erc20,
    abi: ERC20_ABI,
    functionName: 'approve',
    args: [contractAddresses.gameFactory, '1000000'],
    onError: () => onError('Approve was unsuccessful', onApprove),
  });

  const {
    write: writeCreateGame,
    data: createGameData,
    isLoading: isCreateGameLoading,
  } = useContractWrite({
    address: contractAddresses.gameFactory,
    abi: GAME_FACTORY_ABI,
    functionName: 'createGame',
    args: ['0x0000000000000000000000000000000000000000'],
    onError: () => onError('Creating was unsuccessful', onCreateGame),
    onSuccess: () => setActiveIndex(1),
  });

  useWaitForTransaction({
    chainId: sepolia.id,
    hash: approveData?.hash,
    enabled: !!approveData?.hash,
    onSuccess: onApproveSuccess,
    onError: () => onError('Approve was unsuccessful', onApprove),
  });

  useWaitForTransaction({
    chainId: sepolia.id,
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
            <Error title={title} onClick={func} />
          </AnimatedDialogContent>
        ),
      }),
    );
  }

  const onApprove = () => writeApprove?.();

  const onCreateGame = () => writeCreateGame?.();

  const onCreateRound = () => {
    const isApproved = new BN(allowanceData as string).isGreaterThanOrEqualTo(formatUnits('1', 6));

    dispatch(
      openDialog({
        content: isApproved ? (
          <Confirm onCreateGame={onCreateGame} />
        ) : (
          <Approve onApprove={onApprove} />
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
