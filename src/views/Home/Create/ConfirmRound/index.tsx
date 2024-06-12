import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { sepolia } from 'wagmi/chains';
import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import BN from 'bignumber.js';

import { Button } from '@/components';
import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import contractAddresses from '@/constants/contractAddresses';
import ERC20_ABI from '@/abis/ERC20_ABI.json';
import GAME_FACTORY_ABI from '@/abis/GAME_FACTORY_ABI.json';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { AppDispatch } from '@/redux/store';
import formatUnits from '@/helpers/formatUnits';
import { postGame } from '@/redux/features/gameSlice';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';
import LongLoadingContent from '@/views/_components/Dialog/LongLoadingContent';

import Confirm from './Confirm';
import Approve from './Approve';

const ConfirmRound = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { address } = useTypedSelector((state) => state.account.profile);

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
  });

  useWaitForTransaction({
    chainId: sepolia.id,
    hash: approveData?.hash,
    onSuccess: onApproveSuccess,
  });

  useWaitForTransaction({
    chainId: sepolia.id,
    hash: createGameData?.hash,
    onSuccess: onCreateGameSuccess,
    onSettled: onCreateGameSettled,
  });

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
    dispatch(closeDialog());
  }

  function onCreateGameSettled(data: any) {
    const logs = data.logs;
    const lastLog = logs[logs.length - 1];
    const address = lastLog.topics[1];
    const id = Number(address);

    dispatch(postGame({ id }));

    router.push(`/${id}`);
  }

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
                <LongLoadingContent />
              )}
            </AnimatedDialogContent>
          ),
        }),
      );
    }
  }, [isApproveLoading, isCreateGameLoading, dispatch]);

  const onApprove = () => writeApprove?.();
  const onCreateGame = () => writeCreateGame?.();

  const onConfirm = () => {
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
      onClick={onConfirm}
      className="mt-4 mx-auto !font-bold md:w-auto w-full"
    >
      Create Round
    </Button>
  );
};

export default ConfirmRound;
