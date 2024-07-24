import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

interface UseAxiosGet<T> {
  data: T | null;
  error: AxiosError | null;
  loading: boolean;
  refetch: () => Promise<void>;
}

interface UseAxiosGetOptions {
  interval?: number;
  config?: AxiosRequestConfig;
}

const useAxiosGet = <T = unknown>(
  url: string,
  options: UseAxiosGetOptions = {},
): UseAxiosGet<T> => {
  const { interval, config } = options;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response: AxiosResponse<{ result: T }> = await axios.get(url, config);
      setData(response.data?.result);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (interval) {
      const intervalId = setInterval(fetchData, interval);
      return () => clearInterval(intervalId);
    }
  }, [url, config]);

  const refetch = async () => {
    await fetchData();
  };

  return { data, error, loading, refetch };
};

export default useAxiosGet;
