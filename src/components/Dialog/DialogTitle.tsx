import { ReactNode, Ref } from 'react';
import clsx from 'clsx';

interface Props {
  className?: string;
  children: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

const DialogTitle =
  ({ ref, className, children, ...props }: Props) => (
    <h2 ref={ref} className={clsx('text-white text-xl font-bold', className)} {...props}>
      {children}
    </h2>
  );
DialogTitle.displayName = 'DialogTitle';

export default DialogTitle;
