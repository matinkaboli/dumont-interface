import clsx from 'clsx';
import { useDispatch } from 'react-redux';

import { openDialog } from '@/redux/features/dialogSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import KeyButton from '../KeyButton';
import ConfirmReveal from './ConfirmReveal';

const RevealKey = ({ className }: { className?: string }) => {
  const dispatch = useDispatch();
  const { revealCount, activeCardIndex, cards } = useTypedSelector((state) => state.cards);
  const { data: game } = useTypedSelector((state) => state.game);

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
      disabled={!game?.id || cards[activeCardIndex]?.isRevealed || revealCount === 3}
    >
      <div className="text-md text-white font-bold">Reveal {`->`}</div>
      <div className="text-neutral-500 text-sm">{revealCount} / 3 remaining</div>
    </KeyButton>
  );
};

export default RevealKey;
