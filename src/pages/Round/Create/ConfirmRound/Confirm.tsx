import { useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";

import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import { Button, DialogDescription, DialogTitle } from '@/components';

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
      <div className="px-8">
        <div className="bg-white w-full h-[136px] rounded-xl" />
        <DialogTitle className="text-center mt-6">Confirm round</DialogTitle>
        <DialogDescription className="text-center mt-2">
          You need to pay <span className="font-bold">$1</span> to create the round. It is the price
          of honesty
        </DialogDescription>
      </div>
      <Button fullWidth size="md" radius="lg" className="mt-6" onClick={onConfirm}>
        Confirm round
      </Button>
    </>
  );
};

export default Confirm;
