import { ReactNode } from 'react';
import clsx from 'clsx';


interface Props {
  children: ReactNode,
  className?: string
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={clsx('px-40', className)}>
      {children}
    </div>
  );
};

export default Container;
