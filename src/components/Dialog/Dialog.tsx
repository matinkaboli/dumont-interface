import React from 'react';
import { Content, Overlay, Portal, Root } from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { cva, VariantProps } from 'class-variance-authority';

import { Icon } from '@/components';

const contentVariants = cva('fixed z-50 bg-neutral-700 rounded-xl w-3/4 px-6 py-8', {
  variants: {
    size: {
      sm: 'md:w-[340px]',
      md: 'md:w-[412px]',
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
  open: boolean;
  onOpenChange: () => void;
  className?: string;
  showCloseButton?: boolean;
  ref?: React.Ref<React.ElementRef<typeof Root>>;
}

const Dialog = React.forwardRef<React.ElementRef<typeof Root>, DialogProps>(
  ({ open, onOpenChange, showCloseButton = true, className, size, children, ...props }, ref) => (
    <Root ref={ref} {...props}>
      <AnimatePresence>
        {open ? (
          <Portal forceMount>
            <Overlay onClick={onOpenChange} asChild className="fixed inset-0 z-40 bg-black">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
              ></motion.div>
            </Overlay>

            <div className="flex justify-center items-center min-h-[80vh] fixed inset-0 z-50">
              <Content asChild className={contentVariants({ size, className })}>
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 25 }}
                >
                  {children}

                  {showCloseButton && (
                    <div
                      onClick={onOpenChange}
                      className="absolute right-3.5 top-3.5 cursor-pointer"
                    >
                      <Icon name="xmark" color="#75757C" />
                      <span className="sr-only">Close</span>
                    </div>
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
