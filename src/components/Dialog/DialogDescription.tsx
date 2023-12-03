import React from 'react';
import { Description } from '@radix-ui/react-dialog';

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description ref={ref} className={'text-neutral-400 text-base'} {...props} />
));
DialogDescription.displayName = Description.displayName;

export default DialogDescription;
