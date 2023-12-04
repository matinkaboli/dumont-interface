import React from 'react';
import { Close, Content, Portal } from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';

import DialogOverlay from './DialogOverlay';

const MotionContent = motion(Content);

const contentVariants = cva('relative z-50 bg-neutral-600 rounded-xl w-3/4 px-8 pt-8 pb-6', {
  variants: {
    size: {
      sm: 'md:w-[340px]',
      md: 'md:w-[512px]',
      lg: 'md:w-[724px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof MotionContent>,
    VariantProps<typeof contentVariants> {
  showCloseButton?: boolean;
}

const DialogContent = React.forwardRef<React.ElementRef<typeof MotionContent>, DialogContentProps>(
  ({ className, children, size, showCloseButton = false, ...props }, ref) => (
    <Portal>
      <DialogOverlay />

      <div className="flex justify-center items-center h-[80vh]">
        <MotionContent
          ref={ref}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          className={contentVariants({ size, className })}
          {...props}
        >
          {children}

          {showCloseButton && (
            <Close className="absolute right-4 top-4">
              x<span className="sr-only">Close</span>
            </Close>
          )}
        </MotionContent>
      </div>
    </Portal>
  ),
);
DialogContent.displayName = Content.displayName;

export default DialogContent;
