import { ButtonHTMLAttributes, memo } from 'react';
import clsx from 'clsx';

import { KeyType } from './.';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'>, Partial<KeyType> {
  isSkip?: boolean;
  isSelected?: boolean;
}

const btnStyle =
  'sm:h-[84px] h-[65px] w-full flex justify-center items-center gap-0.5 border border-neutral-700 rounded-lg transition ease-in-out';

const Key = memo(
  ({ value, weight, className, isSkip = false, isSelected = false, ...props }: Props) => {
    const dynamicStyles = isSkip ? 'text-md text-white font-bold' : 'flex-col';

    return (
      <div
        className={clsx(
          'border border-transparent',
          isSelected && 'bg-gradiant-border bg-primary-800 bg-origin-border rounded-lg',
          isSkip && 'col-span-2',
        )}
      >
        <button
          type="button"
          className={clsx(
            isSelected ? 'bg-primary-800 !text-primary-250' : 'bg-neutral-750 hover:bg-neutral-700',
            dynamicStyles,
            btnStyle,
            className,
          )}
          {...props}
        >
          {isSkip ? (
            <>Skip {`->`}</>
          ) : (
            <>
              <span className="text-2xl font-bold text-white">{value}</span>
              <span className="text-sm text-neutral-400">x{weight}</span>
            </>
          )}
        </button>
      </div>
    );
  },
);
Key.displayName = 'Key';

export default Key;
