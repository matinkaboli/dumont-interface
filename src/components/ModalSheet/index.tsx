'use client';

import React from 'react';
import Sheet from 'react-modal-sheet';

import { useScreenDetector } from '@/hooks/useScreenDetector';

interface ModalSheetProps extends React.ComponentPropsWithoutRef<typeof Sheet> {
  height?: number;
}

const ModalSheet = React.forwardRef<React.ElementRef<typeof Sheet>, ModalSheetProps>(
  ({ isOpen, onClose, children, disableDrag = true, height = 390, ...props }, ref) => {
    const { isMobile } = useScreenDetector();

    return (
      <Sheet
        ref={ref}
        isOpen={isMobile ? isOpen : false}
        onClose={onClose}
        disableDrag={disableDrag}
        snapPoints={[height, 0]}
        {...props}
      >
        <Sheet.Container className="!bg-neutral-700 !rounded-se-3xl !rounded-ss-3xl pt-3.5 px-6 pb-16">
          <Sheet.Header>
            <div className="h-[5px] w-[77px] bg-neutral-500 rounded-full mx-auto"></div>
          </Sheet.Header>
          <Sheet.Content className="pt-10">{children}</Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop className="!bg-black/75" onTap={onClose} />
      </Sheet>
    );
  },
);
ModalSheet.displayName = 'ModalSheet';

export default ModalSheet;
