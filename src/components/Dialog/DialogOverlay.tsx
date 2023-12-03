import { motion } from 'framer-motion';
import {Overlay} from '@radix-ui/react-dialog';
import React from 'react';

const MotionOverlay = motion(Overlay);

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof MotionOverlay>,
  React.ComponentPropsWithoutRef<typeof MotionOverlay>
>(({ className, ...props }, ref) => (
  <MotionOverlay
    ref={ref}
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.5 }}
    exit={{ opacity: 0 }}
    className={'fixed inset-0 z-40 bg-black'}
    {...props}
  />
));
DialogOverlay.displayName = Overlay.displayName;

export default DialogOverlay;
