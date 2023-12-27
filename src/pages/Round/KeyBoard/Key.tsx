import { ButtonHTMLAttributes, memo } from 'react';
import clsx from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
  weight?: number;
  isSkip?: boolean;
}

const btnStyle =
  'h-[84px] flex justify-center items-center gap-0.5 bg-neutral-750 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition ease-in-out';

const Key = memo(({ value, weight, className, isSkip = false, ...props }: Props) => {
  const dynamicStyles = isSkip ? 'w-[217px] text-md text-white font-bold' : 'flex-col w-[104px]';

  return (
    <button type="button" className={clsx(dynamicStyles, btnStyle, className)} {...props}>
      {isSkip ? (
        <>Skip {`->`}</>
      ) : (
        <>
          <span className="text-2xl font-bold text-white">{value}</span>
          <span className="text-sm text-neutral-400">x{weight}</span>
        </>
      )}
    </button>
  );
});
Key.displayName = 'Key';

export default Key;
