import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Colors API
export const colorsAPI = {
  getColor: async (id) => {
    const response = await api.get(`/colors/${id}`);
    return response.data;
  },
  getColors: async (available = true) => {
    const response = await api.get(`/colors?available=${available}`);
    return response.data;
  },
  
  chooseColor: async (userId, colorId) => {
    const response = await api.post('/colors', { userId: userId, colorId: colorId });
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getUser: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  
  createUser: async (name, id) => {
    const response = await api.post('/users', { name: name, id: id });
    return response.data;
  },
};

export default api; 