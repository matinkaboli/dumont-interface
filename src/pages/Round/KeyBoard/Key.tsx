import { ButtonHTMLAttributes, memo } from 'react';
import clsx from 'clsx';
import { KeyType } from '.';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'>, KeyType {
  isSkip?: boolean;
}

const btnStyle =
  'sm:h-[84px] h-[65px] w-full flex justify-center items-center gap-0.5 bg-neutral-750 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition ease-in-out';

const Key = memo(({ value, weight, className, isSkip = false, ...props }: Props) => {
  const dynamicStyles = isSkip ? 'text-md text-white font-bold' : 'flex-col';

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
