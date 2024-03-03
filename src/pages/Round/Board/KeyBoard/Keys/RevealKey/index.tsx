import clsx from 'clsx';
import { useDispatch } from 'react-redux';

import { openDialog } from '@/redux/features/dialogSlice';

import KeyButton from '../KeyButton';
import ConfirmReveal from './ConfirmReveal';

const RevealKey = ({ className }: { className?: string }) => {
  const dispatch = useDispatch();
  const onOpenDialog = () => {
    dispatch(
      openDialog({
        content: <ConfirmReveal />,
      }),
    );
  };

  return (
    <KeyButton
      className="flex flex-col gap-0.5"
      borderClassName={clsx('col-span-2', className)}
      onClick={onOpenDialog}
    >
      <div className="text-md text-white font-bold">Reveal {`->`}</div>
      <div className="text-neutral-500 text-sm">2 / 3 remaining</div>
    </KeyButton>
  );
};

export default RevealKey;
