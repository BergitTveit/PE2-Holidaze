import axios from 'axios';
import { store } from '../store/store';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': import.meta.env.VITE_API_KEY,
  },
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.user?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
