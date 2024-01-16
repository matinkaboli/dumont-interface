import React from 'react';
import { Description } from '@radix-ui/react-dialog';
import clsx from 'clsx';

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description ref={ref} className={clsx('text-neutral-200 text-sm', className)} {...props} />
));
DialogDescription.displayName = Description.displayName;

export default DialogDescription;
