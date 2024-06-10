import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useContractRead, useContractWrite } from 'wagmi';
import { useRouter } from 'next/navigation';

import { Button } from '@/components';
import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import { postGame } from '@/redux/features/gameSlice';
import contractAddresses from '@/constants/contractAddresses';
import ERC20_ABI from '@/abis/ERC20_ABI.json';
import GAME_FACTORY_ABI from '@/abis/GAME_FACTORY_ABI.json';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { AppDispatch } from '@/redux/store';
import convertDecimalToNumber from '@/helpers/convertDecimalToNumber';

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
    isLoading: isApproveLoading,
    isSuccess: isApproveSuccess,
  } = useContractWrite({
    address: contractAddresses.erc20,
    abi: ERC20_ABI,
    functionName: 'approve',
    args: [contractAddresses.gameFactory, '1000000'],
  });

  const {
    write: writeCreateGame,
    data: createGameData,
    isSuccess: isCreateGameSuccess,
    isLoading: isCreateGameLoading,
  } = useContractWrite({
    address: contractAddresses.gameFactory,
    abi: GAME_FACTORY_ABI,
    functionName: 'createGame',
    args: ['0x0000000000000000000000000000000000000000'],
  });

  useEffect(() => {
    if (isApproveLoading) {
      dispatch(
        openDialog({
          content: (
            <AnimatedDialogContent key="loading">
              <LoadingContent title="Waiting for the network" desc="It will take a few seconds" />
            </AnimatedDialogContent>
          ),
        }),
      );
    }

    if (isApproveSuccess) {
      dispatch(
        openDialog({
          content: (
            <AnimatedDialogContent key="confirm">
              <Confirm onCreateGame={onCreateGame} />
            </AnimatedDialogContent>
          ),
        }),
      );
    }
  }, [isApproveLoading, isApproveSuccess]);

  useEffect(() => {
    if (isCreateGameLoading) {
      dispatch(
        openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: (
            <AnimatedDialogContent key="loading">
              <LongLoadingContent />
            </AnimatedDialogContent>
          ),
        }),
      );
    }

    if (isCreateGameSuccess) {
      dispatch(postGame({ id: createGameData?.hash }));
      dispatch(closeDialog());
      router.push(`/${createGameData?.hash}`);
    }
  }, [isCreateGameLoading, isCreateGameSuccess]);

  const onApprove = () => writeApprove?.();
  const onCreateGame = () => writeCreateGame?.();

  const onConfirm = () => {
    const approvalValue = convertDecimalToNumber(allowanceData);

    dispatch(
      openDialog({
        content:
          approvalValue > 1 ? (
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
