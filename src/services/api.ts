// src/services/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // URL do servidor Agnus Gestão
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para injetar automaticamente o Token JWT salvo no localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@AgnusGestao:token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});