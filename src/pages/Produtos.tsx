import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Plus, Edit2, Trash2, Package, X, AlertCircle } from 'lucide-react';
import { Header } from '../components/layout/Header';

interface Produto {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
  quantidade_estoque?: number;
  categoria?: string;
}

export const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  // Estado do Modal
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  // Campos do formulário
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      setErro('');
      const res = await api.get('/produtos');
      
      // Normalização dos produtos recebidos da API
      const listaFormatada = res.data.map((p: any) => ({
        ...p,
        preco: Number(p.preco) || 0,
        estoque: p.quantidade_estoque !== undefined ? p.quantidade_estoque : (p.estoque || 0)
      }));

      setProdutos(listaFormatada);
    } catch (err: any) {
      setErro('Erro ao carregar a lista de produtos do servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const limparFormulario = () => {
    setNome('');
    setCategoria('');
    setDescricao('');
    setPreco('');
    setEstoque('');
    setEditandoId(null);
    setModalAberto(false);
  };

  const handleAbrirEditar = (prod: Produto) => {
    const qtdEstoque = prod.quantidade_estoque !== undefined ? prod.quantidade_estoque : prod.estoque;
    setEditandoId(prod.id);
    setNome(prod.nome);
    setCategoria(prod.categoria || '');
    setDescricao(prod.descricao || '');
    setPreco(prod.preco.toString());
    setEstoque((qtdEstoque || 0).toString());
    setModalAberto(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    const qtdEstoqueNum = parseInt(estoque, 10) || 0;

    const payload = {
      nome,
      categoria: categoria || 'ARTIGO_RELIGIOSO',
      descricao,
      preco: parseFloat(preco),
      quantidade_estoque: qtdEstoqueNum,
      estoque: qtdEstoqueNum
    };

    try {
      if (editandoId) {
        await api.put(`/produtos/${editandoId}`, payload);
      } else {
        await api.post('/produtos', payload);
      }
      limparFormulario();
      carregarProdutos();
    } catch (err: any) {
      setErro(err.response?.data?.mensagem || 'Erro ao salvar produto. Verifique suas permissões de ADMIN.');
    }
  };

  const handleExcluir = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      await api.delete(`/produtos/${id}`);
      carregarProdutos();
    } catch (err: any) {
      setErro(err.response?.data?.mensagem || 'Erro ao excluir produto.');
    }
  };

  return (
    <div style={{ backgroundColor: '#faf8f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ padding: '2rem 1.5rem', maxWidth: '1100px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        {/* Cabeçalho do Painel */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h2 style={{ margin: 0, color: '#4a0e17', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={28} color="#d4af37" />
              Gestão de Produtos (Admin)
            </h2>
            <p style={{ margin: '0.2rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
              Cadastre, edite ou remova itens do catálogo da lanchonete e loja.
            </p>
          </div>

          <button
            onClick={() => { limparFormulario(); setModalAberto(true); }}
            style={{
              backgroundColor: '#4a0e17',
              color: '#ffffff',
              border: '2px solid #d4af37',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              transition: 'all 0.2s'
            }}
          >
            <Plus size={18} color="#fef08a" /> Novo Produto
          </button>
        </div>

        {/* Alerta de Erro */}
        {erro && (
          <div style={{
            backgroundColor: '#fef2f2',
            borderLeft: '4px solid #dc2626',
            color: '#991b1b',
            padding: '1rem',
            borderRadius: '6px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={20} />
            <span>{erro}</span>
          </div>
        )}

        {/* Modal Pop-up para Formulário de Edição / Criação */}
        {modalAberto && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
            padding: '1rem'
          }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '500px',
              overflow: 'hidden',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
              border: '2px solid #d4af37'
            }}>
              {/* Modal Topbar */}
              <div style={{
                backgroundColor: '#4a0e17',
                color: '#ffffff',
                padding: '1rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fef08a' }}>
                  {editandoId ? '✏️ Editar Produto' : '✨ Cadastrar Novo Produto'}
                </h3>
                <button
                  onClick={limparFormulario}
                  style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '0.2rem' }}
                >
                  <X size={22} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 2 }}>
                    <label style={labelStyle}>Nome do Produto *</label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required
                      placeholder="Ex: Pastel de Carne"
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Categoria</label>
                    <input
                      type="text"
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                      placeholder="Ex: ALIMENTO ou ARTIGO_RELIGIOSO"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Descrição</label>
                  <input
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Descrição breve do produto..."
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Preço (R$) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={preco}
                      onChange={(e) => setPreco(e.target.value)}
                      required
                      placeholder="0.00"
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Estoque *</label>
                    <input
                      type="number"
                      value={estoque}
                      onChange={(e) => setEstoque(e.target.value)}
                      required
                      placeholder="0"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                  <button
                    type="button"
                    onClick={limparFormulario}
                    style={{
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      border: 'none',
                      padding: '0.6rem 1.2rem',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#4a0e17',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.6rem 1.5rem',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    {editandoId ? 'Atualizar Dados' : 'Salvar Produto'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tabela de Produtos */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>Carregando dados do servidor...</p>
        ) : (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            border: '1px solid #e2e8f0'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#4a0e17', color: '#ffffff' }}>
                  <th style={thStyle}>Produto</th>
                  <th style={thStyle}>Categoria</th>
                  <th style={thStyle}>Preço</th>
                  <th style={thStyle}>Estoque</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((p, idx) => (
                  <tr
                    key={p.id}
                    style={{
                      backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa',
                      borderBottom: '1px solid #e2e8f0'
                    }}
                  >
                    <td style={tdStyle}>
                      <strong style={{ color: '#1e293b' }}>{p.nome}</strong>
                      {p.descricao && (
                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                          {p.descricao}
                        </div>
                      )}
                    </td>
                    <td style={tdStyle}>
                      <span style={{
                        backgroundColor: '#fef08a',
                        color: '#713f12',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px'
                      }}>
                        {p.categoria || 'Geral'}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 'bold', color: '#4a0e17' }}>
                      R$ {Number(p.preco).toFixed(2)}
                    </td>
                    <td style={tdStyle}>
                      <span style={{
                        fontWeight: 'bold',
                        color: (p.quantidade_estoque ?? p.estoque) > 5 ? '#16a34a' : '#dc2626'
                      }}>
                        {p.quantidade_estoque ?? p.estoque} un.
                      </span>
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <button
                        onClick={() => handleAbrirEditar(p)}
                        title="Editar"
                        style={iconBtnStyle}
                      >
                        <Edit2 size={18} color="#2563eb" />
                      </button>
                      <button
                        onClick={() => handleExcluir(p.id)}
                        title="Excluir"
                        style={iconBtnStyle}
                      >
                        <Trash2 size={18} color="#dc2626" />
                      </button>
                    </td>
                  </tr>
                ))}

                {produtos.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                      Nenhum produto cadastrado no momento.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.82rem',
  fontWeight: 'bold',
  color: '#334155',
  marginBottom: '0.3rem'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.6rem',
  borderRadius: '6px',
  border: '1px solid #cbd5e1',
  fontSize: '0.9rem',
  outline: 'none',
  boxSizing: 'border-box'
};

const thStyle: React.CSSProperties = {
  padding: '0.9rem 1.2rem',
  fontSize: '0.85rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const tdStyle: React.CSSProperties = {
  padding: '0.9rem 1.2rem',
  fontSize: '0.9rem'
};

const iconBtnStyle: React.CSSProperties = {
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  padding: '0.3rem',
  margin: '0 0.2rem',
  borderRadius: '4px'
};