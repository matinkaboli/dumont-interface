import { useDispatch } from 'react-redux';

import { Button, DialogDescription, DialogIcon, DialogTitle } from '@/components';
import { openDialog } from '@/redux/features/dialogSlice';
import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';

import Confirm from './Confirm';

const Approve = () => {
  const dispatch = useDispatch();
  const onConfirm = () =>
    dispatch(
      openDialog({
        content: (
          <AnimatedDialogContent key="confirm">
            <Confirm />
          </AnimatedDialogContent>
        ),
      }),
    );

  return (
    <>
      <DialogIcon name="badge-check-rainbow" variant="default" />
      <DialogTitle className="text-center mt-4">USDT Approval</DialogTitle>
      <DialogDescription className="text-neutral-300 text-base text-center mt-1">
        Approval limit reached. To continue playing, please provide further approval.
      </DialogDescription>
      <Button fullWidth size="md" radius="lg" className="mt-7" onClick={onConfirm}>
        Approve
      </Button>
    </>
  );
};

export default Approve;
