import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateData = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async (id, updatedData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.patch(`${API_URL}/${url}/${id}`, updatedData);
      return response.data;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateData, isLoading, error };
};
