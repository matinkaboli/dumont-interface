import { useDispatch } from 'react-redux';

import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import { Button, DialogDescription, DialogTitle } from '@/components';

import LoadingMessage from '@/pages/_components/LoadingMessage';

const Confirm = () => {
  const dispatch = useDispatch();
  const onConfirm = () => {
    dispatch(closeDialog());

    setTimeout(() => {
      dispatch(
        openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: (
            <LoadingMessage title="Waiting to creating round" desc="This may take few seconds" />
          ),
        }),
      );
    }, 150);
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
