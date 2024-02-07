'use client';

import { useDispatch } from 'react-redux';

import { Dialog, ModalSheet } from '@/components';
import { closeDialog } from '@/redux/features/dialogSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const DialogRoot = () => {
  const dispatch = useDispatch();
  const { open, dialogProps, content } = useTypedSelector((state) => state.dialog);

  const handleCloseDialog = () => {
    dispatch(closeDialog());
  };

  return (
    <div>
      <ModalSheet isOpen={open} onClose={handleCloseDialog} className="md:hidden block">
        {content}
      </ModalSheet>
      <Dialog
        {...dialogProps}
        open={open}
        onOpenChange={handleCloseDialog}
        className="md:block hidden"
      >
        {content}
      </Dialog>
    </div>
  );
};

export default DialogRoot;
