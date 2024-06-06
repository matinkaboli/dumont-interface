import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

interface UseAxiosGet<T> {
  data: T | null;
  error: AxiosError | null;
  loading: boolean;
}

const useAxiosGet = <T = unknown>(url: string, config?: AxiosRequestConfig, interval?: number): UseAxiosGet<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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

    fetchData();

    if (interval) {
      const intervalId = setInterval(fetchData, interval);
      return () => clearInterval(intervalId);
    }
  }, [url, config]);

  return { data, error, loading };
};

export default useAxiosGet;
