import React from 'react';
import { Close, Content, Overlay, Portal, Root, Trigger } from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { cva, VariantProps } from 'class-variance-authority';

import { Icon } from '@/components';

const contentVariants = cva('fixed z-50 bg-neutral-700 rounded-xl w-3/4 px-8 pt-8 pb-6', {
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

interface DialogProps
  extends React.ComponentPropsWithoutRef<typeof Root>,
    VariantProps<typeof contentVariants> {
  className?: string;
  showCloseButton?: boolean;
  triggerElement?: React.ReactNode;
  ref?: React.Ref<React.ElementRef<typeof Root>>;
}

const Dialog = React.forwardRef<React.ElementRef<typeof Root>, DialogProps>(
  ({ open, showCloseButton, className, size, triggerElement, children, ...props }, ref) => (
    <Root ref={ref} {...props}>
      <Trigger asChild>{triggerElement}</Trigger>

      <AnimatePresence>
        {open ? (
          <Portal forceMount>
            <Overlay asChild className="fixed inset-0 z-40 bg-black">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
              ></motion.div>
            </Overlay>

            <div className="flex justify-center items-center h-[80vh]">
              <Content asChild className={contentVariants({ size, className })}>
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 25 }}
                >
                  {children}

                  {showCloseButton && (
                    <Close className="absolute right-4 top-4">
                      <Icon name="xmark" color="#ADADB6" width="20px" height="20px" />
                      <span className="sr-only">Close</span>
                    </Close>
                  )}
                </motion.div>
              </Content>
            </div>
          </Portal>
        ) : null}
      </AnimatePresence>
    </Root>
  ),
);
Dialog.displayName = Root.displayName;

export default Dialog;
