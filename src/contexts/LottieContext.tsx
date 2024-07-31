import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';

import { totalLottieAssets } from '@/constants/general';

interface LottieContextType {
  onLottieLoad: () => void;
  allAssetsLoaded: boolean;
};

const LottieContext = createContext<LottieContextType | undefined>(undefined);

export const useLottieContext = (): LottieContextType => {
  const context = useContext(LottieContext);
  if (!context) {
    throw new Error('useLottieContext must be used within a LottieProvider');
  }
  return context;
};

export const LottieProvider = ({ children }: PropsWithChildren) => {
  const [loadedCount, setLoadedCount] = useState(0);

  const onLottieLoad = useCallback(() => {
    setLoadedCount(prevCount => prevCount + 1);
  }, []);

  const allAssetsLoaded = loadedCount === totalLottieAssets;

  return (
    <LottieContext.Provider value={{ onLottieLoad, allAssetsLoaded }}>
      {children}
    </LottieContext.Provider>
  );
};
