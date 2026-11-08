import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import { Login } from '../pages/Login';
import { Cadastro } from '../pages/Cadastro';
import { VendasAdmin } from '../pages/VendasAdmin';
import { Dashboard } from '../pages/Dashboard';
import { Produtos } from '../pages/Produtos';
import { CadastroVoluntario } from '../pages/CadastroVoluntario';
import { RecuperarSenha } from '../pages/RecuperarSenha';
import { RedefinirSenha } from '../pages/RedefinirSenha';
import Loja from '../pages/Loja';
import { MinhasCompras } from '../pages/MinhasCompras';
import { CaixaVoluntario } from '../pages/CaixaVoluntario';
import { FinanceiroAdmin } from '../pages/FinanceiroAdmin';
import { NotFound } from '../pages/NotFound';

const Loading = () => (
  <div
    style={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      color: '#4a0e17',
    }}
  >
    Carregando sessão...
  </div>
);

const RotaPorPerfil: React.FC<{
  perfis: string[];
  children: React.ReactNode;
}> = ({ perfis, children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <Loading />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const perfil = String(user?.perfil || '').toUpperCase();

  if (!perfis.includes(perfil)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const InicioPorPerfil: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <Loading />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return String(user?.perfil || '').toUpperCase() === 'ADMIN'
    ? <Dashboard />
    : <Loja />;
};

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route
      path="/"
      element={<Navigate to="/login" replace />}
    />

    <Route
      path="/login"
      element={<Login />}
    />

    <Route
      path="/cadastro"
      element={<Cadastro />}
    />

    <Route
      path="/recuperar-senha"
      element={<RecuperarSenha />}
    />

    <Route
      path="/redefinir-senha"
      element={<RedefinirSenha />}
    />

    <Route
      path="/dashboard"
      element={<InicioPorPerfil />}
    />

    <Route
      path="/loja"
      element={
        <RotaPorPerfil
          perfis={['CLIENTE', 'VOLUNTARIO']}
        >
          <Loja />
        </RotaPorPerfil>
      }
    />

    <Route
      path="/minhas-compras"
      element={
        <RotaPorPerfil perfis={['CLIENTE']}>
          <MinhasCompras />
        </RotaPorPerfil>
      }
    />

    <Route
      path="/caixa"
      element={
        <RotaPorPerfil perfis={['VOLUNTARIO']}>
          <CaixaVoluntario />
        </RotaPorPerfil>
      }
    />

    <Route
      path="/vendas-admin"
      element={
        <RotaPorPerfil perfis={['ADMIN']}>
          <VendasAdmin />
        </RotaPorPerfil>
      }
    />

    <Route
      path="/financeiro"
      element={
        <RotaPorPerfil perfis={['ADMIN']}>
          <FinanceiroAdmin />
        </RotaPorPerfil>
      }
    />

    <Route
      path="/produtos"
      element={
        <RotaPorPerfil perfis={['ADMIN']}>
          <Produtos />
        </RotaPorPerfil>
      }
    />

    <Route
      path="/cadastro-voluntario"
      element={
        <RotaPorPerfil perfis={['ADMIN']}>
          <CadastroVoluntario />
        </RotaPorPerfil>
      }
    />

    <Route
      path="*"
      element={<NotFound />}
    />
  </Routes>
);