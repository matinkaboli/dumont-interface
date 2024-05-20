import React, { createContext, ReactNode, useContext, useState } from 'react';

interface MobileNavContextProps {
  isNavOpen: boolean;
  toggleNav: () => void;
}

const MobileNavContext = createContext<MobileNavContextProps | undefined>(undefined);

export const MobileNavProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const toggleNav = () => setIsNavOpen(prev => !prev);

  return (
    <MobileNavContext.Provider value={{ isNavOpen, toggleNav }}>
      {children}
    </MobileNavContext.Provider>
  );
};

export const useMobileNav = (): MobileNavContextProps => {
  const context = useContext(MobileNavContext);
  if (!context) {
    throw new Error('useMobileNav must be used within a MobileNavProvider');
  }
  return context;
};
