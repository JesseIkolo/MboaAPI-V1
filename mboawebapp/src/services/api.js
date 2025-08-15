import config from '../config/env';
import axios from 'axios';

const resolvedBaseURL = (config.API_URL || '').replace(/\/$/, '');
const api = axios.create({
  baseURL: resolvedBaseURL ? resolvedBaseURL + '/api' : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
  withCredentials: true,
});

// Ajoute le token à chaque requête si présent
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // debug meta timing
    config.metadata = { start: new Date() };
    const fullUrl = `${config.baseURL || ''}${config.url || ''}`;
    // Safe log (avoid sensitive data)
    console.log('[API][request]', config.method?.toUpperCase(), fullUrl);
    return config;
  },
  (error) => {
    console.error('[API][request][error]', error?.message || error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    const start = response.config?.metadata?.start?.getTime?.() || Date.now();
    const elapsed = Date.now() - start;
    const fullUrl = `${response.config.baseURL || ''}${response.config.url || ''}`;
    console.log('[API][response]', response.config.method?.toUpperCase(), fullUrl, response.status, `${elapsed}ms`);
    return response;
  },
  (error) => {
    const cfg = error?.config || {};
    const start = cfg?.metadata?.start?.getTime?.() || Date.now();
    const elapsed = Date.now() - start;
    const fullUrl = `${cfg.baseURL || ''}${cfg.url || ''}`;
    const status = error?.response?.status;
    console.error('[API][response][error]', cfg.method?.toUpperCase(), fullUrl, status, `${elapsed}ms`, error?.message || error);
    return Promise.reject(error);
  }
);

export default api; 