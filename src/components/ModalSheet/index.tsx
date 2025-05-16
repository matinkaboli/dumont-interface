'use client';

import { ComponentPropsWithRef } from 'react';
import Sheet from 'react-modal-sheet';

import { useScreenDetector } from '@/hooks/useScreenDetector';

interface ModalSheetProps extends ComponentPropsWithRef<typeof Sheet> {
  height?: number;
}

const ModalSheet =
  ({ ref, isOpen, onClose, children, disableDrag = true, ...props }: ModalSheetProps) => {
    const { isMobile } = useScreenDetector();

    return (
      <Sheet
        ref={ref}
        isOpen={isMobile ? isOpen : false}
        onClose={onClose}
        disableDrag={disableDrag}
        detent='content-height'
        {...props}
      >
        <Sheet.Container className='!h-auto !bg-neutral-750 !rounded-se-3xl !rounded-ss-3xl'>
          <Sheet.Header>
            <div className='mt-3.5 h-[5px] w-[77px] bg-neutral-500 rounded-full mx-auto' />
          </Sheet.Header>
          <Sheet.Content>
            <Sheet.Scroller>
              <div className='pt-10 px-6 pb-16'>{children}</div>
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop className='!bg-black/75' onTap={onClose} />
      </Sheet>
    );
  };
ModalSheet.displayName = 'ModalSheet';

export default ModalSheet;
