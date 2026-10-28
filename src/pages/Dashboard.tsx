// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

interface Item {
  id: string | number;
  nome?: string;
  descricao?: string;
}

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [dados, setDados] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        // Garante o envio do token salvo no localStorage
        const token = localStorage.getItem('@AgnusGestao:token');
        
        // Altere '/produtos' para a rota desejada do seu back-end (/vendas, etc.)
        const response = await api.get('/produtos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Trata o retorno aceitando tanto array direto quanto objeto com lista
        const lista = Array.isArray(response.data) ? response.data : response.data.produtos || [];
        setDados(lista);
        setError('');
      } catch (err) {
        console.error('Erro ao buscar dados do Dashboard:', err);
        setError('Não foi possível carregar os dados. Verifique se o back-end está ativo.');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Cabecalho */}
      <header style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '20px', textAlign: 'center' }}>
        <h1>Agnus Dei - Grupo de Oração</h1>
      </header>

      {/* Conteudo Principal */}
      <main style={{ flex: 1, padding: '40px', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2>Membros e Atividades do Grupo</h2>
          <div>
            <span style={{ marginRight: '15px' }}>Olá, <strong>{user?.nome || 'Usuário'}</strong></span>
            <button 
              onClick={logout} 
              style={{ padding: '6px 16px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              Sair
            </button>
          </div>
        </div>

        {error && (
          <div style={{ color: 'red', textAlign: 'center', margin: '20px 0' }}>
            {error}
          </div>
        )}

        {loading ? (
          <p style={{ textAlign: 'center' }}>Carregando dados...</p>
        ) : (
          <div>
            {dados.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666' }}>Nenhum registro encontrado.</p>
            ) : (
              <ul>
                {dados.map((item) => (
                  <li key={item.id}>{item.nome || item.descricao || `Item #${item.id}`}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>

      {/* Rodapé */}
      <footer style={{ padding: '20px', textAlign: 'center', borderTop: '1px solid #eee', color: '#666' }}>
        <p>© 2026 Grupo de Oração Agnus Dei. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};