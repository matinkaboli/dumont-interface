'use client';

import { ReactNode } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

import { MobileNavProvider } from '@/contexts/MobileNavContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { LottieProvider } from '@/contexts/LottieContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ParallaxProvider>
      <LoadingProvider>
        <LottieProvider>
          <MobileNavProvider>
            {children}
          </MobileNavProvider>
        </LottieProvider>
      </LoadingProvider>
    </ParallaxProvider>
  );
}
