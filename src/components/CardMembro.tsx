// src/components/CardMembro.tsx
import React from 'react';
import { UserCheck } from 'lucide-react';

interface CardMembroProps {
  nome: string;
  descricao?: string;
}

export const CardMembro: React.FC<CardMembroProps> = ({ nome, descricao }) => {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '1.25rem',
      border: '1px solid #e2e8f0',
      borderLeft: '4px solid #d4af37',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <UserCheck size={20} color="#4a0e17" />
        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1a1a1a', fontWeight: '600' }}>
          {nome}
        </h3>
      </div>
      <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b', lineHeight: '1.4' }}>
        {descricao || 'Membro do Grupo de Oração'}
      </p>
    </div>
  );
};