import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';

interface InitialVisitContextType {
  isInitialVisit: boolean;
  setIsInitialVisit: Dispatch<SetStateAction<boolean>>;
}

const InitialVisitContext = createContext<InitialVisitContextType | undefined>(undefined);

export const InitialVisitProvider = ({ children }: PropsWithChildren) => {
  const [isInitialVisit, setIsInitialVisit] = useState(true);

  return (
    <InitialVisitContext.Provider value={{ isInitialVisit, setIsInitialVisit }}>
      {children}
    </InitialVisitContext.Provider>
  );
};

export const useInitialVisit = (): InitialVisitContextType => {
  const context = useContext(InitialVisitContext);
  if (context === undefined) {
    throw new Error('useInitialVisit must be used within an InitialVisitProvider');
  }
  return context;
};
