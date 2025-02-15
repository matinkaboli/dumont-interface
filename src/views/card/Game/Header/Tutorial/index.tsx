'use client';

import { useDispatch } from 'react-redux';

import { Button, Icon } from '@/components';
import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import delayedPromise from '@/helpers/delayedPromise';

import TutorialContent from './TutorialContent';

const Tutorial = () => {
  const dispatch = useDispatch();
  const { open } = useTypedSelector((state) => state.dialog);
  const onOpenDialog = async () => {
    if (open) dispatch(closeDialog());

    await delayedPromise(
      () => dispatch(openDialog({ content: <TutorialContent />, dialogProps: { size: 'lg' } })),
      open ? 200 : 0,
    );
  };

  return (
    <Button
      variant="neutral"
      size="sm"
      radius="lg"
      className="w-10 h-10 !p-0"
      onClick={onOpenDialog}
    >
      <Icon name="graduation-cap" />
    </Button>
  );
};

export default Tutorial;
