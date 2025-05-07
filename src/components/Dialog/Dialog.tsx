import React from 'react';
import { Content, Overlay, Portal, Root, Title } from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'motion/react';
import { cva, VariantProps } from 'class-variance-authority';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { Icon } from '@/components';

const contentVariants = cva('fixed z-50 bg-neutral-750 rounded-xl w-3/4 px-6 py-8', {
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

export interface DialogProps
  extends React.ComponentProps<typeof Root>,
    VariantProps<typeof contentVariants> {
  open: boolean;
  onOpenChange: () => void;
  onCloseButton?: () => void;
  onClickOverlay?: () => void;
  className?: string;
  showCloseButton?: boolean;
  disableEvents?: boolean;
}

const Dialog = ({
                  open,
                  onOpenChange,
                  onCloseButton,
                  onClickOverlay,
                  showCloseButton = true,
                  disableEvents = false,
                  className,
                  size,
                  children,
                  ...props
                }: DialogProps) => {
  const onCloseDialog = () => {
    if (!disableEvents) onOpenChange();
  };

  const handleCloseButton = () => {
    if (onCloseButton) {
      onCloseButton();
    } else {
      onCloseDialog();
    }
  };

  const handleClickOverlay = () => {
    if (onClickOverlay) {
      onClickOverlay();
    } else {
      onCloseDialog();
    }
  };

  return (
    <Root {...props}>
      <AnimatePresence>
        {open ? (
          <Portal forceMount>
            <Overlay onClick={handleClickOverlay} asChild className='fixed inset-0 z-40 bg-black'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
              ></motion.div>
            </Overlay>

            <div className='flex justify-center items-center min-h-[80vh] fixed inset-0 z-50'>
              <Content asChild className={contentVariants({ size, className })}>
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 25 }}
                >
                  <VisuallyHidden><Title>Dumont</Title></VisuallyHidden>
                  {children}

                  {showCloseButton && (
                    <div
                      onClick={handleCloseButton}
                      className='absolute right-3.5 top-3.5 cursor-pointer'
                    >
                      <Icon name='xmark' color='#75757C' />
                      <span className='sr-only'>Close</span>
                    </div>
                  )}
                </motion.div>
              </Content>
            </div>
          </Portal>
        ) : null}
      </AnimatePresence>
    </Root>
  );
};
Dialog.displayName = Root.displayName;

export default Dialog;
