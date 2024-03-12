import React from 'react';
import clsx from 'clsx';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const DialogDescription = React.forwardRef<HTMLHeadingElement, Props>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={clsx('text-neutral-300 text-base', className)} {...props}>
      {children}
    </p>
  ),
);
DialogDescription.displayName = 'DialogDescription';

export default DialogDescription;
