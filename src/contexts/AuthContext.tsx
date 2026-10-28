// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../services/api';
import type { User, LoginCredentials, AuthResponse } from '../types/auth';

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('@AgnusGestao:token');
    const storedUser = localStorage.getItem('@AgnusGestao:user');

    if (storedToken && storedUser) {
      try {
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('@AgnusGestao:token');
        localStorage.removeItem('@AgnusGestao:user');
      }
    }

    setLoading(false);
  }, []);

 // src/contexts/AuthContext.tsx

const login = async (credentials: LoginCredentials) => {
  const rawPassword = credentials.pass || credentials.password;

  const response = await api.post<AuthResponse>('/auth/login', {
    email: credentials.email,
    senha: rawPassword,
    password: rawPassword,
  });

  // Tenta capturar 'user' ou 'usuario' da resposta do back-end
  const token = response.data.token;
  const userData = response.data.user || (response.data as any).usuario || response.data;

  if (token && userData) {
    localStorage.setItem('@AgnusGestao:token', token);
    localStorage.setItem('@AgnusGestao:user', JSON.stringify(userData));

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  } else {
    throw new Error('Resposta do servidor inválida');
  }
};
  const logout = () => {
    localStorage.removeItem('@AgnusGestao:token');
    localStorage.removeItem('@AgnusGestao:user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};