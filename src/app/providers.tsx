'use client';

import { PropsWithChildren } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

import { MobileNavProvider } from '@/contexts/MobileNavContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { LottieProvider } from '@/contexts/LottieContext';
import { InitialVisitProvider } from '@/contexts/InitialVisitContext';

export function Providers({ children }: PropsWithChildren) {
  return (
    <ParallaxProvider>
      <InitialVisitProvider>
        <LoadingProvider>
          <LottieProvider>
            <MobileNavProvider>
              {children}
            </MobileNavProvider>
          </LottieProvider>
        </LoadingProvider>
      </InitialVisitProvider>
    </ParallaxProvider>
  );
}
