import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useContractWrite } from 'wagmi';

import { AppDispatch } from '@/redux/store';
import { Button, DialogDescription, DialogIcon, DialogTitle, Icon } from '@/components';
import GAME_FACTORY_ABI from '@/abis/GAME_FACTORY_ABI.json';
import { postGame } from '@/redux/features/gameSlice';
import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import LongLoadingContent from '@/views/_components/Dialog/LongLoadingContent';
import delayedPromise from '@/helpers/delayedPromise';

const Confirm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const {
    write: createGame,
    data: writeData,
    isSuccess,
    isLoading,
    error,
  } = useContractWrite({
    address: '0x88D5E2D3B8D3Ce415fF5717DEc9340f1114364Fd',
    abi: GAME_FACTORY_ABI,
    functionName: 'createGame',
    args: ['0x0000000000000000000000000000000000000000'],
  });

  const onConfirm = async () => {
    dispatch(postGame({ id: 34 }));

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

    await delayedPromise(() => dispatch(closeDialog()), 12000).then(() => {
      router.push('/34');
    });

    createGame?.();
  };

  return (
    <>
      <DialogIcon name="game-objects-rainbow" variant="default" />
      <DialogTitle className="text-center mt-5">Confirm round</DialogTitle>
      <DialogDescription className="text-neutral-300 text-base text-center mt-1">
        You need to pay <span className="font-bold">$1</span> to create the round.
      </DialogDescription>
      <div className="flex flex-col gap-4 mt-8">
        <Button fullWidth size="md" radius="lg" onClick={onConfirm}>
          Create
        </Button>
        <Button
          variant="link"
          size="md"
          className="w-fit mx-auto text-neutral-400 hover:text-neutral-300 [&_.path]:hover:fill-neutral-300 font-semibold text-base"
          rightSection={<Icon name="arrow-up-right" />}
        >
          Why should pay
        </Button>
      </div>
    </>
  );
};

export default Confirm;
