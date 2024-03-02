import { memo } from 'react';

import KeyLayout from './KeyLayout';
import { KeyType } from '../.';

export interface KeyProps extends Partial<KeyType> {
  isSelected?: boolean;
  className?: string;
  onClick?: () => void;
}

const Key = memo(({ value, weight, className, isSelected = false, ...props }: KeyProps) => {
  return (
    <KeyLayout isSelected={isSelected} className={className} buttonClassName="flex-col" {...props}>
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="text-sm text-neutral-400">x{weight}</span>
    </KeyLayout>
  );
});
Key.displayName = 'Key';

export default Key;
