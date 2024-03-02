import { ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  isSelected?: boolean;
  className?: string;
  buttonClassName?: string;
  children: ReactNode;
  onClick?: () => void;
}

const KeyLayout = ({
  isSelected = false,
  className,
  buttonClassName,
  onClick,
  children,
}: Props) => {
  return (
    <div
      className={clsx(
        className,
        'border border-transparent',
        isSelected && 'bg-gradiant-border bg-primary-800 bg-origin-border rounded-lg',
      )}
    >
      <button
        type="button"
        className={clsx(
          buttonClassName,
          isSelected ? 'bg-primary-800 !text-primary-250' : 'bg-neutral-750 hover:bg-neutral-700',
          'sm:h-[84px] h-[65px] w-full flex justify-center items-center gap-0.5 border border-neutral-700 rounded-lg transition ease-in-out',
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default KeyLayout;
