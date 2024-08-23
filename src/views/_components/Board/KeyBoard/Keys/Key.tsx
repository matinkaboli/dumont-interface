import { memo } from 'react';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import KeyButton from './KeyButton';
import { KeyType } from '../index';

export interface KeyProps extends Partial<KeyType> {
  weight: number;
  isSelected?: boolean;
  className?: string;
  onClick?: () => void;
}

const Key = memo(({ value, weight, className, isSelected = false, onClick }: KeyProps) => {
  const { areAllCardsGuessed } = useTypedSelector((state) => state.game);

  const isDisabled = weight === 0 || areAllCardsGuessed;
  const weightDisplay = isDisabled ? '-' : `x${weight}`;

  return (
    <KeyButton
      isSelected={isSelected}
      borderClassName={className}
      onClick={onClick}
      disabled={isDisabled}
      className="flex-col"
    >
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="text-sm text-neutral-400">{weightDisplay}</span>
    </KeyButton>
  );
});
Key.displayName = 'Key';

export default Key;
