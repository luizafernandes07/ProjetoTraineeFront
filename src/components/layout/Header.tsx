// src/components/layout/Header.tsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [menuAberta, setMenuAberta] = useState(false);

  const scrollToSection = (id: string) => {
    setMenuAberta(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#4a0e17',
      color: '#ffffff',
      padding: '0.8rem 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '3px solid #d4af37',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)'
    }}>
      {/* Brand / Logo */}
      <div 
        onClick={() => scrollToSection('inicio')}
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
      >
        <div style={{
          backgroundColor: '#d4af37',
          color: '#4a0e17',
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 0 2px #fef08a'
        }}>
          AΩ
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>
            AgnusGestão
          </h1>
          <span style={{ fontSize: '0.68rem', color: '#fef08a', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            Grupo de Oração RCC
          </span>
        </div>
      </div>

      {/* Navigation Desktop */}
      <nav className="desktop-nav" style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
        <button onClick={() => scrollToSection('produtos')} style={navBtnStyle}>Lanchonete & Loja</button>
        <button onClick={() => scrollToSection('encontro')} style={navBtnStyle}>Encontro</button>
        <button onClick={() => scrollToSection('sobre')} style={navBtnStyle}>Sobre</button>
        <button onClick={() => scrollToSection('musicas')} style={navBtnStyle}>Músicas</button>
        <button onClick={() => scrollToSection('retiros')} style={navBtnStyle}>Retiros</button>
        <button onClick={() => scrollToSection('doacao')} style={navBtnStyle}>Doação</button>
      </nav>

      {/* User Actions & Mobile Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div className="user-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#f8fafc' }}>
          <User size={16} color="#d4af37" />
          <span>{user?.nome || 'Servidor'}</span>
        </div>

        <button 
          onClick={logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            backgroundColor: 'transparent',
            color: '#fef08a',
            border: '1px solid #d4af37',
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '600'
          }}
        >
          <LogOut size={15} /> Sair
        </button>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="mobile-toggle"
          onClick={() => setMenuAberta(!menuAberta)}
          style={{
            background: 'none',
            border: 'none',
            color: '#d4af37',
            cursor: 'pointer',
            padding: '0.2rem'
          }}
        >
          {menuAberta ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {menuAberta && (
        <div className="mobile-drawer" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#4a0e17',
          borderBottom: '3px solid #d4af37',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem',
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
        }}>
          <button onClick={() => scrollToSection('produtos')} style={mobileNavBtnStyle}>Lanchonete & Loja</button>
          <button onClick={() => scrollToSection('encontro')} style={mobileNavBtnStyle}>Encontro Semanal</button>
          <button onClick={() => scrollToSection('sobre')} style={mobileNavBtnStyle}>Sobre o Agnus Dei</button>
          <button onClick={() => scrollToSection('musicas')} style={mobileNavBtnStyle}>Músicas & Louvores</button>
          <button onClick={() => scrollToSection('retiros')} style={mobileNavBtnStyle}>Retiros Realizados</button>
          <button onClick={() => scrollToSection('doacao')} style={mobileNavBtnStyle}>Apoie via PIX</button>
        </div>
      )}
    </header>
  );
};

const navBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#ffffff',
  fontSize: '0.85rem',
  fontWeight: '500',
  cursor: 'pointer',
  padding: '0.25rem 0.5rem',
  transition: 'color 0.2s'
};

const mobileNavBtnStyle = {
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(212, 175, 55, 0.3)',
  color: '#ffffff',
  padding: '0.75rem',
  borderRadius: '8px',
  textAlign: 'left' as const,
  fontWeight: 'bold',
  fontSize: '0.9rem'
};