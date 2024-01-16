import { useEffect, useState } from 'react';

export const useScreenDetector = () => {
  const isClient = typeof window === 'object';
  const [width, setWidth] = useState(isClient ? window.innerWidth : 0);

  const handleWindowSizeChange = () => {
    setWidth(isClient ? window.innerWidth : 0);
  };

  useEffect(() => {
    if (isClient) {
      window.addEventListener('resize', handleWindowSizeChange);

      return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
      };
    }
  }, [isClient]);

  const isMobile = width <= 768;
  const isTablet = width <= 1024;
  const isDesktop = width > 1024;

  return { isMobile, isTablet, isDesktop };
};
