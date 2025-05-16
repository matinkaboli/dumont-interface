import { ReactNode, Ref } from 'react';
import clsx from 'clsx';

interface Props {
  className?: string;
  children: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

const DialogDescription =
  ({ ref, className, children, ...props }: Props) => (
    <p ref={ref} className={clsx('text-neutral-300 text-base', className)} {...props}>
      {children}
    </p>
  );
DialogDescription.displayName = 'DialogDescription';

export default DialogDescription;
