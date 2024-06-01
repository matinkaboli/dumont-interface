import clsx from 'clsx';
import { useDispatch } from 'react-redux';

import { openDialog } from '@/redux/features/dialogSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import KeyButton from '../KeyButton';
import ConfirmReveal from './ConfirmReveal';

const RevealKey = ({ className }: { className?: string }) => {
  const dispatch = useDispatch();
  const { data: game, leakedCount, activeCardIndex } = useTypedSelector((state) => state.game);

  const onOpenDialog = () => {
    dispatch(
      openDialog({
        content: <ConfirmReveal />,
      }),
    );
  };

  return (
    <KeyButton
      className="flex flex-col gap-0.5 disabled:bg-neutral-800 disabled:border-neutral-750 [&>div]:disabled:text-neutral-500"
      borderClassName={clsx('col-span-2', className)}
      onClick={onOpenDialog}
      disabled={!game?.id || game.cards[activeCardIndex]?.isLeaked || leakedCount === 0}
    >
      <div className="text-md text-white font-bold">Reveal {`->`}</div>
      <div className="text-neutral-500 text-sm">{leakedCount} / 3 remaining</div>
    </KeyButton>
  );
};

export default RevealKey;
