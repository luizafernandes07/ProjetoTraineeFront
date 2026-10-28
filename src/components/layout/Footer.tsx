// src/components/layout/Footer.tsx
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: '#31080e',
      color: '#e2e8f0',
      padding: '2rem 1.5rem',
      marginTop: 'auto',
      borderTop: '3px solid #d4af37',
      textAlign: 'center',
      fontSize: '0.85rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', color: '#fef08a' }}>
          AgnusGestão — Sistema de Gestão do Grupo de Oração Agnus Dei
        </p>
        <p style={{ margin: '0 0 1rem 0', color: '#94a3b8' }}>
          Paróquia São Vicente Férrer • Formiga - MG • Renovação Carismática Católica
        </p>
        <div style={{ fontSize: '0.75rem', color: '#64748b', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem' }}>
          © {new Date().getFullYear()} AgnusGestão. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};