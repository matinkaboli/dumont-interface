import { memo } from 'react';

import KeyButton from './KeyButton';
import { KeyType } from '../index';

export interface KeyProps extends Partial<KeyType> {
  isSelected?: boolean;
  className?: string;
  onClick?: () => void;
}

const Key = memo(({ value, weight, className, isSelected = false, onClick }: KeyProps) => {
  return (
    <KeyButton
      isSelected={isSelected}
      className="flex-col"
      borderClassName={className}
      onClick={onClick}
    >
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="text-sm text-neutral-400">x{weight}</span>
    </KeyButton>
  );
});
Key.displayName = 'Key';

export default Key;
