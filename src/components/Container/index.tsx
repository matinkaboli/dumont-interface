import { ReactNode } from 'react';
import clsx from 'clsx';


interface Props {
  children: ReactNode,
  className?: string
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={clsx('md:px-40 px-4', className)}>
      {children}
    </div>
  );
};

export default Container;
