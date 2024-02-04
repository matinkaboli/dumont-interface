'use client';

import { useDispatch } from 'react-redux';

import { Dialog, ModalSheet } from '@/components';
import { closeDialog } from '@/redux/features/dialogSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useScreenDetector } from '@/hooks/useScreenDetector';

const DialogRoot = () => {
  const dispatch = useDispatch();
  const { isMobile } = useScreenDetector();
  const { open, dialogProps, content } = useTypedSelector((state) => state.dialog);

  const handleCloseDialog = () => {
    dispatch(closeDialog());
  };

  return (
    <>
      {isMobile ? (
        <ModalSheet isOpen={open} onClose={handleCloseDialog}>
          {content}
        </ModalSheet>
      ) : (
        <Dialog {...dialogProps} open={open} onOpenChange={handleCloseDialog}>
          {content}
        </Dialog>
      )}
    </>
  );
};

export default DialogRoot;
