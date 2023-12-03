import React from 'react';
import { Title } from '@radix-ui/react-dialog';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof Title>,
  React.ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
  <Title ref={ref} className={'text-white text-2xl font-bold'} {...props} />
));
DialogTitle.displayName = Title.displayName;

export default DialogTitle;
