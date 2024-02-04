import React from 'react';
import clsx from 'clsx';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const DialogTitle = React.forwardRef<HTMLHeadingElement, Props>(
  ({ className, children, ...props }, ref) => (
    <h2 ref={ref} className={clsx('text-white text-xl font-bold', className)} {...props}>
      {children}
    </h2>
  ),
);
DialogTitle.displayName = 'DialogTitle';

export default DialogTitle;
