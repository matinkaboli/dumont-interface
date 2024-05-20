'use client';

import { ReactNode } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

import { MobileNavProvider } from '@/contexts/MobileNavContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ParallaxProvider>
      <MobileNavProvider>
        {children}
      </MobileNavProvider>
    </ParallaxProvider>
  );
}
