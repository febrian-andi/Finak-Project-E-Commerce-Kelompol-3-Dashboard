import axios from 'axios';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export const usePostData = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addData = async (newData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/${url}`, newData);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { addData, isLoading, error };
};
