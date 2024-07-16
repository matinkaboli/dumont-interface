import clsx from 'clsx';
import { ButtonProps } from '@/components/Button';

const MaxButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={clsx('flex items-center gap-0.5 font-medium md:text-xs text-sm text-primary-250', className)}
      {...props}
    >
      Max
      {children}
    </button>
  );
};

export default MaxButton;
