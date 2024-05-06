'use client';

import { PropsWithChildren, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScroll = ({ children }: PropsWithChildren) => {

  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export default SmoothScroll;
