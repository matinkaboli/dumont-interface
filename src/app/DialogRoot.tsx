'use client';
import { useDispatch } from 'react-redux';

import { Dialog } from '@/components';
import { closeDialog } from '@/redux/features/dialogSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const DialogRoot = () => {
  const dispatch = useDispatch();
  const { open, dialogProps, content } = useTypedSelector((state) => state.dialog);

  return (
    <Dialog {...dialogProps} open={open} onOpenChange={() => dispatch(closeDialog())}>
      {content}
    </Dialog>
  );
};

export default DialogRoot;
