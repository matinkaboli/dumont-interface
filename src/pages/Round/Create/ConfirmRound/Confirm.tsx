import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import { Button, DialogDescription, DialogIcon, DialogTitle, Icon } from '@/components';

import LoadingMessage from '@/pages/_components/LoadingMessage';
import { confirmRound } from '@/redux/features/createRoundSlice';
import delayedPromise from '@/helpers/delayedPromise';

const Confirm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onConfirm = () => {
    dispatch(closeDialog());

    const openLoadingDialog = delayedPromise(() => {
      dispatch(
        openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: (
            <LoadingMessage title="Waiting to creating round" desc="This may take few seconds" />
          ),
        }),
      );
    }, 300);

    const delayedCloseDialog = delayedPromise(() => dispatch(closeDialog()), 2000);

    Promise.all([openLoadingDialog, delayedCloseDialog]).then(() => {
      dispatch(confirmRound());
      router.push('/?id=34');
    });
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
