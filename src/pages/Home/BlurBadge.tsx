import { ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  children: ReactNode,
  className?: string
}

const BlurBadge = ({ children, className }: Props) => {
  return (
    <div
      className={clsx('bg-gradiant-blur backdrop-blur-xl shadow-xl rounded-full flex items-center gap-1 h-10 px-3 text-base text-neutral-300 w-fit', className)}>
      {children}
    </div>
  );
};

export default BlurBadge;
