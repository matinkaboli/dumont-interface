'use client';

import { useDispatch } from 'react-redux';

import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import delayedPromise from '@/helpers/delayedPromise';

const Tutorial = () => {
  const dispatch = useDispatch();
  const { open } = useTypedSelector((state) => state.dialog);
  const onOpenDialog = async () => {
    if (open) dispatch(closeDialog());

    await delayedPromise(
      () => dispatch(openDialog({ content: <div>hhdiuhiu</div> })),
      open ? 200 : 0,
    );
  };

  return (
    <button type="button" onClick={onOpenDialog}>
      Tutorial
    </button>
  );
};

export default Tutorial;
