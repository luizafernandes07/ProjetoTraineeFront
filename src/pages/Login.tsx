// src/pages/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      // Passa as credenciais dentro de um único objeto
      await login({ email, pass: senha, password: senha });
      navigate('/dashboard');
    } catch (err: any) {
      setErro(err.response?.data?.message || 'E-mail ou senha incorretos.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#faf8f5',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '2.5rem 2rem',
        boxShadow: '0 8px 24px rgba(74, 14, 23, 0.12)',
        border: '1px solid #e2e8f0',
        borderTop: '5px solid #4a0e17',
        textAlign: 'center'
      }}>
        {/* Brasão em texto com estilo sacral */}
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#4a0e17',
          color: '#d4af37',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem auto',
          boxShadow: '0 0 0 4px #fef08a'
        }}>
          AΩ
        </div>

        <h2 style={{ color: '#4a0e17', marginBottom: '0.25rem', fontSize: '1.5rem' }}>Agnus Dei</h2>
        <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          Acesse a plataforma do Grupo de Oração
        </p>

        {erro && (
          <div style={{
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            padding: '0.75rem',
            borderRadius: '6px',
            fontSize: '0.85rem',
            marginBottom: '1rem',
            border: '1px solid #fecaca'
          }}>
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1a1a1a', display: 'block', marginBottom: '0.4rem' }}>
              E-mail
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#64748b" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.65rem 0.65rem 2.3rem',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1a1a1a', display: 'block', marginBottom: '0.4rem' }}>
              Senha
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#64748b" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.65rem 0.65rem 2.3rem',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={carregando}
            style={{
              backgroundColor: '#4a0e17',
              color: '#ffffff',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.95rem',
              cursor: carregando ? 'not-allowed' : 'pointer',
              marginTop: '0.5rem',
              boxShadow: '0 2px 6px rgba(74, 14, 23, 0.25)',
              transition: 'background 0.2s'
            }}
          >
            {carregando ? 'Entrando...' : 'Entrar na Plataforma'}
          </button>
        </form>
      </div>
    </div>
  );
};