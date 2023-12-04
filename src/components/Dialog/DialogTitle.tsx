import React from 'react';
import { Title } from '@radix-ui/react-dialog';
import clsx from 'clsx';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof Title>,
  React.ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
  <Title ref={ref} className={clsx('text-white text-2xl font-bold', className)} {...props} />
));
DialogTitle.displayName = Title.displayName;

export default DialogTitle;
