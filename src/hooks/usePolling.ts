import { useEffect, useState } from 'react';

export function usePolling(
  isActive: boolean,
  fetchData: () => Promise<any>,
  checkComplete: (data: any) => boolean,
  interval = 300
) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    let pollInterval: NodeJS.Timeout;
    setIsLoading(true);

    const checkData = () => {
      fetchData().then((data) => {
        if (checkComplete(data)) {
          setIsLoading(false);
          clearInterval(pollInterval);
        }
      }).catch((error) => {
        console.error('Polling error:', error);
        setIsLoading(false);
        clearInterval(pollInterval);
      });
    };

    checkData(); // Initial check

    pollInterval = setInterval(checkData, interval);

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [isActive]);

  return isLoading;
}
