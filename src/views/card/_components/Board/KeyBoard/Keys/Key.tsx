import { memo } from 'react';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import KeyButton from './KeyButton';
import { KeyType } from '../index';
import clsx from 'clsx';

export interface KeyProps extends Partial<KeyType> {
  weight: number;
  isSelected?: boolean;
  className?: string;
  onClick?: () => void;
}

const Key = memo(({ value, weight, className, isSelected = false, onClick }: KeyProps) => {
  const { areAllCardsGuessed } = useTypedSelector((state) => state.faro.main);

  const isDisabled = weight === 0 || areAllCardsGuessed;
  const weightDisplay = isDisabled ? '-' : `x${weight}`;

  return (
    <KeyButton
      isSelected={isSelected}
      borderClassName={className}
      onClick={onClick}
      disabled={isDisabled}
      className="flex-col group"
    >
      <span className={clsx('text-2xl font-bold', isSelected ? 'text-primary-400' : 'text-white')}>
        {value}
      </span>
      <span
        className={clsx(
          'text-sm weight transition ease-in-out',
          isSelected ? 'text-primary-400' : 'text-neutral-500 group-hover:text-neutral-300',
        )}
      >
        {weightDisplay}
      </span>
    </KeyButton>
  );
});
Key.displayName = 'Key';

export default Key;
