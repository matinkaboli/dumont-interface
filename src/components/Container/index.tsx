import { ReactNode } from 'react';
import clsx from 'clsx';


interface Props {
  children: ReactNode,
  className?: string,
  tag?: keyof JSX.IntrinsicElements;
}

const Container = ({ children, className, tag: Tag = 'div' }: Props) => {
  return (
    <Tag className={clsx('xl:px-40 lg:px-32 md:px-10 px-4', className)}>
      {children}
    </Tag>
  );
};

export default Container;
