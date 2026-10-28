// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '3rem', color: '#1e293b', margin: '0 0 0.5rem 0' }}>404</h1>
      <h2 style={{ color: '#64748b', margin: '0 0 1rem 0' }}>Página não encontrada</h2>
      <p style={{ margin: '0 0 1.5rem 0', color: '#475569' }}>
        A página que você está tentando acessar não existe.
      </p>
      <Link 
        to="/dashboard" 
        style={{ 
          color: '#2563eb', 
          textDecoration: 'none', 
          fontWeight: 'bold',
          border: '1px solid #2563eb',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          display: 'inline-block'
        }}
      >
        Voltar para o Dashboard
      </Link>
    </div>
  );
};