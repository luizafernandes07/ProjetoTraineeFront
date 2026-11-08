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
    const storedUser = localStorage.getItem('@AgnusGestao:user') || localStorage.getItem('@AgnusGestao:usuario');

    if (storedToken && storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({ ...parsed, perfil: String(parsed.perfil || parsed.role || 'CLIENTE').toUpperCase() });
      } catch (error) {
        localStorage.removeItem('@AgnusGestao:token');
        localStorage.removeItem('@AgnusGestao:user');
        localStorage.removeItem('@AgnusGestao:usuario');
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const creds = credentials as Record<string, any>;
    const rawPassword = creds.senha || creds.password || creds.pass || '';

    const response = await api.post<AuthResponse>('/auth/login', {
      email: credentials.email,
      senha: rawPassword,
    });

    const token = response.data.token;
    const rawUser = (response.data as any).usuario || response.data.user;
    const userData = rawUser ? { ...rawUser, perfil: String(rawUser.perfil || rawUser.role || 'CLIENTE').toUpperCase() } : null;

    if (token && userData) {
      localStorage.setItem('@AgnusGestao:token', token);
      localStorage.setItem('@AgnusGestao:user', JSON.stringify(userData));
      localStorage.removeItem('@AgnusGestao:usuario');
      setUser(userData);
    } else {
      throw new Error('Resposta do servidor inválida');
    }
  };

  const logout = () => {
    localStorage.removeItem('@AgnusGestao:token');
    localStorage.removeItem('@AgnusGestao:user');
    localStorage.removeItem('@AgnusGestao:usuario');
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