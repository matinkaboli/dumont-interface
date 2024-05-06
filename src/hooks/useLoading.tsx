import { useState } from 'react';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return {
    isLoading,
    setLoading,
  };
};
