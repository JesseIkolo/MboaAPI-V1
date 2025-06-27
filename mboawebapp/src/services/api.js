import config from '../config/env';
import axios from 'axios';

const api = axios.create({
  baseURL: config.API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajoute le token à chaque requête si présent
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api; 