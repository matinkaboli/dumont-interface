import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected?: boolean;
  borderClassName?: string;
}

const KeyButton = ({
  isSelected = false,
  className,
  borderClassName,
  children,
  ...props
}: Props) => {
  return (
    <div
      className={clsx(
        borderClassName,
        'border border-transparent',
        isSelected && 'bg-gradiant-border bg-primary-800 bg-origin-border rounded-lg',
      )}
    >
      <button
        type="button"
        className={clsx(
          className,
          isSelected ? 'bg-primary-800 !text-primary-250' : 'bg-neutral-750 hover:bg-neutral-700',
          'sm:h-[84px] h-[65px] w-full flex justify-center items-center gap-0.5 border border-neutral-700 rounded-lg disabled:bg-neutral-800 disabled:border-neutral-750 transition ease-in-out',
        )}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default KeyButton;
