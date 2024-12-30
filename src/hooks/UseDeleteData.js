import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useDeleteData = (url) => {
  const deleteData = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${url}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { deleteData };
};