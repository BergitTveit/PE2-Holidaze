import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const { accessToken } = JSON.parse(user);
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default api;
