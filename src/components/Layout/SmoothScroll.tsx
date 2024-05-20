'use client';

import { PropsWithChildren } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';

const SmoothScroll = ({ children }: PropsWithChildren) => {
  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
