import useSWR from 'swr';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useFetchData = (url, id = null) => {
  const fetcher = async (url) => {
    const response = await axios.get(`${API_URL}/${url}`);
    return response.data;
  };

  const { data, error, isLoading, mutate } = useSWR(
    id ? `${API_URL}/${url}/${id}` : url,
    fetcher
  );

  const refetch = () => mutate();

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
