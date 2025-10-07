'use client';

import clsx from 'clsx';
import { PulsingCircle } from '@/components';

type LiveToggleButtonProps = {
  isLive: boolean;
  onToggle: () => void;
};

const LiveToggleButton = ({ isLive, onToggle }: LiveToggleButtonProps) => {
  return (
    <button
      type='button'
      onClick={onToggle}
      className={clsx(
        'h-7 min-w-[64px] px-3 border bg-neutral-750 flex-center gap-1 font-medium text-sm text-white rounded-full transition duration-150 ease-in-out',
        isLive ? 'border-success-600' : 'border-neutral-750',
      )}
    >
      <PulsingCircle size='sm' color={isLive ? 'success' : 'neutral'} />
      {isLive ? 'Live' : 'All'}
    </button>
  );
};

export default LiveToggleButton;
