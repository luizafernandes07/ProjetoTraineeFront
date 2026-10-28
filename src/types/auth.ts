// src/types/auth.ts

export interface LoginCredentials {
  email: string;
  pass?: string;     // Para dar suporte se usar 'pass'
  password?: string; // Para dar suporte se usar 'password'
}

export interface User {
  id: string | number;
  nome: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}