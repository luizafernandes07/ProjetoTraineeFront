// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MainLayout } from '../components/layout/MainLayout';
import { 
  ShoppingBag, 
  Calendar, 
  Music, 
  Flame, 
  HeartHandshake, 
  QrCode, 
  MapPin, 
  Clock, 
  Phone, 
  ExternalLink,
  ChevronDown,
  ShoppingCart,
  Sparkles,
  CheckCircle2,
  Copy,
  Info,
  ShieldCheck
} from 'lucide-react';

interface ProdutoDemo {
  id: string;
  nome: string;
  categoria: 'ALIMENTO' | 'ARTIGO_RELIGIOSO';
  preco: number;
  descricao: string;
  estoque: number;
}

const PRODUTOS_CATALOGO: ProdutoDemo[] = [
  { id: '1', nome: 'Pastel de Carne / Queijo', categoria: 'ALIMENTO', preco: 8.00, descricao: 'Frito na hora na lanchonete do encontro.', estoque: 45 },
  { id: '2', nome: 'Refrigerante Lata 350ml', categoria: 'ALIMENTO', preco: 5.00, descricao: 'Coca-Cola, Guaraná e Fanta.', estoque: 60 },
  { id: '3', nome: 'Suco Natural 300ml', categoria: 'ALIMENTO', preco: 6.00, descricao: 'Sabor Laranja ou Acerola.', estoque: 30 },
  { id: '4', nome: 'Terço de Madeira Agnus Dei', categoria: 'ARTIGO_RELIGIOSO', preco: 15.00, descricao: 'Terço artesanal com medalha de São Bento.', estoque: 20 },
  { id: '5', nome: 'Camiseta Oficial Agnus Dei', categoria: 'ARTIGO_RELIGIOSO', preco: 45.00, descricao: 'Tecido 100% algodão com símbolo AΩ.', estoque: 15 },
  { id: '6', nome: 'Livro de Orações e Cânticos', categoria: 'ARTIGO_RELIGIOSO', preco: 12.00, descricao: 'Guia de oração para o grupo.', estoque: 25 },
];

const InstagramIcon = ({ size = 18, color = "#d4af37" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [carrinho, setCarrinho] = useState<{ produto: ProdutoDemo; qtd: number }[]>([]);
  const [copiado, setCopiado] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState<'TODOS' | 'ALIMENTO' | 'ARTIGO_RELIGIOSO'>('TODOS');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const adicionarAoCarrinho = (prod: ProdutoDemo) => {
    setCarrinho((prev) => {
      const existe = prev.find((item) => item.produto.id === prod.id);
      if (existe) {
        return prev.map((item) => item.produto.id === prod.id ? { ...item, qtd: item.qtd + 1 } : item);
      }
      return [...prev, { produto: prod, qtd: 1 }];
    });
  };

  const removerDoCarrinho = (id: string) => {
    setCarrinho((prev) => prev.filter(item => item.produto.id !== id));
  };

  const totalCarrinho = carrinho.reduce((acc, item) => acc + (item.produto.preco * item.qtd), 0);

  const copiarPix = () => {
    navigator.clipboard.writeText('agnusdeirenovacao@gmail.com');
    setCopiado(true);
    setTimeout(() => setCopiado(false), 3000);
  };

  const produtosFiltrados = PRODUTOS_CATALOGO.filter(p => 
    filtroCategoria === 'TODOS' ? true : p.categoria === filtroCategoria
  );

  return (
    <MainLayout>
      {/* BANNER PRINCIPAL / HERO */}
      <section id="inicio" style={{
        backgroundColor: '#4a0e17',
        color: '#ffffff',
        padding: '4rem 2rem',
        borderRadius: '20px',
        textAlign: 'center',
        marginBottom: '3rem',
        borderBottom: '6px solid #d4af37',
        boxShadow: '0 12px 35px rgba(74, 14, 23, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          color: '#4a0e17',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          boxShadow: '0 0 0 6px #d4af37, 0 8px 20px rgba(0,0,0,0.3)',
          letterSpacing: '-1px'
        }}>
          AΩ
        </div>

        <span style={{ 
          backgroundColor: 'rgba(212, 175, 55, 0.2)', 
          color: '#fef08a', 
          padding: '0.3rem 0.9rem', 
          borderRadius: '20px', 
          fontSize: '0.8rem', 
          fontWeight: 'bold',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          border: '1px solid rgba(212, 175, 55, 0.4)'
        }}>
          Renovação Carismática Católica • Diocese de Luz
        </span>

        <h1 style={{ fontSize: '2.6rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', color: '#ffffff' }}>
          Grupo de Oração Agnus Dei
        </h1>

        <p style={{ fontSize: '1.05rem', color: '#fef08a', maxWidth: '650px', margin: '0 auto 1.75rem auto', fontStyle: 'italic', lineHeight: '1.6' }}>
          "In principio creavit Deus cælum et terram" — Paróquia São Vicente Férrer • Formiga - MG
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => scrollTo('produtos')}
            style={{
              backgroundColor: '#d4af37',
              color: '#4a0e17',
              border: 'none',
              padding: '0.75rem 1.6rem',
              borderRadius: '30px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s'
            }}
          >
            Lanchonete & Loja <ChevronDown size={18} />
          </button>
          
          <a 
            href="https://www.instagram.com/go.agnusdei_/" 
            target="_blank" 
            rel="noreferrer"
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              color: '#ffffff',
              border: '2px solid #d4af37',
              padding: '0.75rem 1.6rem',
              borderRadius: '30px',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'background 0.2s'
            }}
          >
            <InstagramIcon size={18} color="#d4af37" /> Siga @go.agnusdei_
          </a>
        </div>
      </section>
{/* BOAS-VINDAS / IDENTIFICAÇÃO DO PERFIL DO USUÁRIO */}
      <section style={{
        backgroundColor: '#ffffff',
        padding: '1.25rem 1.75rem',
        borderRadius: '14px',
        marginBottom: '2.5rem',
        borderLeft: '5px solid #d4af37',
        boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ShieldCheck size={26} color="#4a0e17" />
          <div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' }}>
              Sessão Autenticada
            </span>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1a1a1a' }}>
              Bem-vindo(a), {user?.nome || 'Membro Servidor'}!
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span style={{
            backgroundColor: ((user as any)?.perfil || (user as any)?.role) === 'ADMIN' ? '#4a0e17' : '#e2e8f0',
            color: ((user as any)?.perfil || (user as any)?.role) === 'ADMIN' ? '#fef08a' : '#475569',
            padding: '0.35rem 0.8rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 'bold'
          }}>
            Perfil: {(user as any)?.perfil || (user as any)?.role || 'VOLUNTARIO'}
          </span>
        </div>
      </section>
      
      {/* SEÇÃO 1: CATÁLOGO DE PRODUTOS DA LANCHONETE E ARTIGOS RELIGIOSOS */}
      <section id="produtos" style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ color: '#4a0e17', fontSize: '1.75rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShoppingBag color="#d4af37" size={28} /> Lanchonete & Artigos Religiosos
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0.3rem 0 0 0' }}>
              Consumo presencial nos encontros semanais. Toda a renda é revertida para os retiros e evangelização.
            </p>
          </div>

          {/* Filtro de Categorias */}
          <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#ffffff', padding: '0.3rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <button 
              onClick={() => setFiltroCategoria('TODOS')}
              style={{
                backgroundColor: filtroCategoria === 'TODOS' ? '#4a0e17' : 'transparent',
                color: filtroCategoria === 'TODOS' ? '#ffffff' : '#64748b',
                border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem'
              }}
            >
              Todos
            </button>
            <button 
              onClick={() => setFiltroCategoria('ALIMENTO')}
              style={{
                backgroundColor: filtroCategoria === 'ALIMENTO' ? '#4a0e17' : 'transparent',
                color: filtroCategoria === 'ALIMENTO' ? '#ffffff' : '#64748b',
                border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem'
              }}
            >
              Alimentos
            </button>
            <button 
              onClick={() => setFiltroCategoria('ARTIGO_RELIGIOSO')}
              style={{
                backgroundColor: filtroCategoria === 'ARTIGO_RELIGIOSO' ? '#4a0e17' : 'transparent',
                color: filtroCategoria === 'ARTIGO_RELIGIOSO' ? '#ffffff' : '#64748b',
                border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem'
              }}
            >
              Artigos Religiosos
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: carrinho.length > 0 ? '2.2fr 1fr' : '1fr', gap: '1.5rem' }}>
          {/* Grid de Produtos */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.25rem' }}>
            {produtosFiltrados.map((item) => (
              <div key={item.id} style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                padding: '1.35rem',
                border: '1px solid #e2e8f0',
                borderTop: '5px solid #4a0e17',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease-in-out'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.68rem', color: '#d4af37', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {item.categoria === 'ALIMENTO' ? 'Lanchonete' : 'Lojinha'}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#16a34a', backgroundColor: '#f0fdf4', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: '600' }}>
                      Estoque: {item.estoque}
                    </span>
                  </div>

                  <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1.1rem', color: '#1a1a1a', fontWeight: 'bold' }}>
                    {item.nome}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: '1.4', margin: '0 0 1rem 0' }}>
                    {item.descricao}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #e2e8f0', paddingTop: '0.8rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#4a0e17' }}>
                    R$ {item.preco.toFixed(2)}
                  </span>

                  <button 
                    onClick={() => adicionarAoCarrinho(item)}
                    style={{
                      backgroundColor: '#4a0e17',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      boxShadow: '0 2px 6px rgba(74, 14, 23, 0.2)'
                    }}
                  >
                    <ShoppingCart size={15} color="#d4af37" /> Adicionar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Carrinho de Compras do Encontro */}
          {carrinho.length > 0 && (
            <div style={{
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              borderRadius: '14px',
              border: '2px solid #d4af37',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              height: 'fit-content',
              position: 'sticky',
              top: '90px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid #faf8f5', paddingBottom: '0.75rem' }}>
                <h3 style={{ color: '#4a0e17', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                  <ShoppingCart color="#d4af37" size={20} /> Pedido
                </h3>
                <span style={{ fontSize: '0.75rem', backgroundColor: '#fef08a', color: '#4a0e17', padding: '0.2rem 0.5rem', borderRadius: '10px', fontWeight: 'bold' }}>
                  {carrinho.reduce((a, b) => a + b.qtd, 0)} itens
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem', maxHeight: '250px', overflowY: 'auto' }}>
                {carrinho.map((c) => (
                  <div key={c.produto.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem', borderBottom: '1px dashed #f1f5f9', paddingBottom: '0.5rem' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#1a1a1a' }}>{c.produto.nome}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{c.qtd}x R$ {c.produto.preco.toFixed(2)}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 'bold', color: '#4a0e17' }}>R$ {(c.produto.preco * c.qtd).toFixed(2)}</span>
                      <button 
                        onClick={() => removerDoCarrinho(c.produto.id)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '0.8rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '1.25rem' }}>
                <span>Valor Total:</span>
                <span style={{ color: '#4a0e17' }}>R$ {totalCarrinho.toFixed(2)}</span>
              </div>

              <button 
                onClick={() => {
                  alert('Pedido registrado com sucesso no caixa!');
                  setCarrinho([]);
                }}
                style={{
                  width: '100%',
                  backgroundColor: '#16a34a',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.8rem',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <CheckCircle2 size={18} /> Confirmar / Pagar no Caixa
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SEÇÃO 2: ENCONTRO SEMANAL DE ORAÇÃO */}
      <section id="encontro" style={{ marginBottom: '4rem' }}>
        <h2 style={{ color: '#4a0e17', fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Calendar color="#d4af37" size={28} /> Nosso Encontro Semanal
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '16px', borderLeft: '6px solid #4a0e17', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <span style={{ backgroundColor: '#fef08a', color: '#4a0e17', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
              TODA SEXTA-FEIRA
            </span>
            <h3 style={{ color: '#1a1a1a', margin: '0.6rem 0 1rem 0', fontSize: '1.3rem' }}>Sextas-Feiras às 20:00h</h3>
            <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              O Grupo de Oração Agnus Dei acolhe você e sua família para momentos marcantes de louvor carismático, pregação da Palavra, adoração ao Santíssimo Sacramento e efusão do Espírito Santo.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#faf8f5', padding: '1.25rem', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Clock color="#4a0e17" size={22} />
                <div>
                  <strong style={{ color: '#1a1a1a', fontSize: '0.9rem' }}>Horário do Encontro</strong>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Início pontualmente às 20h00</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MapPin color="#4a0e17" size={22} />
                <div>
                  <strong style={{ color: '#1a1a1a', fontSize: '0.9rem' }}>Local do Encontro</strong>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Salão da Matriz São Vicente Férrer — Formiga / MG</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone color="#4a0e17" size={22} />
                <div>
                  <strong style={{ color: '#1a1a1a', fontSize: '0.9rem' }}>Contato & Informações</strong>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>(37) 99801-6039</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '16px', borderLeft: '6px solid #d4af37', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ color: '#4a0e17', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Como Chegar na Matriz</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              A Paróquia São Vicente Férrer fica localizada na região central de Formiga - MG. O salão paroquial conta com estrutura para acolher jovens e famílias.
            </p>

            <a 
              href="https://maps.google.com/?q=Matriz+Sao+Vicente+Ferrer+Formiga+MG" 
              target="_blank" 
              rel="noreferrer"
              style={{
                backgroundColor: '#4a0e17',
                color: '#ffffff',
                textAlign: 'center',
                padding: '0.85rem',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(74, 14, 23, 0.2)'
              }}
            >
              Traçar Rota no Google Maps <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: SOBRE O GRUPO */}
      <section id="sobre" style={{ marginBottom: '4rem', backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
        <h2 style={{ color: '#4a0e17', fontSize: '1.75rem', marginBottom: '1rem', borderBottom: '3px solid #d4af37', paddingBottom: '0.5rem' }}>
          Sobre a Nossa História & Propósito
        </h2>
        <p style={{ color: '#334155', lineHeight: '1.8', fontSize: '1.02rem', marginBottom: '1.5rem' }}>
          O <strong>Grupo de Oração Agnus Dei</strong> é um grupo pertencente à Renovação Carismática Católica (RCC) da Diocese de Luz, atuante na Paróquia São Vicente Férrer em Formiga - MG. Nosso propósito é propagar o amor de Deus através da evangelização, do pastoreio de jovens e adultos e do serviço comunitário fraterno.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <div style={{ backgroundColor: '#faf8f5', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #d4af37' }}>
            <h4 style={{ color: '#4a0e17', margin: '0 0 0.5rem 0', fontSize: '1.05rem' }}>Espiritualidade Carismática</h4>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
              Encontros focados na experiência marcante do batismo no Espírito Santo, dons carismáticos e adoração contínua.
            </p>
          </div>

          <div style={{ backgroundColor: '#faf8f5', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #4a0e17' }}>
            <h4 style={{ color: '#4a0e17', margin: '0 0 0.5rem 0', fontSize: '1.05rem' }}>Acolhimento e Família</h4>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
              Um espaço de braços abertos para acolher a juventude, casais e famílias com carinho e oração.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: MÚSICAS & SPOTIFY EMBED */}
      <section id="musicas" style={{ marginBottom: '4rem', backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
        <h2 style={{ color: '#4a0e17', fontSize: '1.75rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Music color="#d4af37" size={28} /> Músicas & Louvor Oficial
        </h2>
        <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          Ouça as canções oficiais e playlists de louvor do Agnus Dei no Spotify:
        </p>

        <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}>
          <iframe 
            style={{ borderRadius: '16px' }} 
            src="https://open.spotify.com/embed/artist/6TTYFyM6N4SZDhKxnHCzTF?utm_source=generator&theme=0" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            title="Spotify Agnus Dei"
          ></iframe>
        </div>
      </section>

      {/* SEÇÃO 5: RETIROS REALIZADOS */}
      <section id="retiros" style={{ marginBottom: '4rem' }}>
        <h2 style={{ color: '#4a0e17', fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Flame color="#d4af37" size={28} /> Retiros Realizados
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '16px', borderTop: '5px solid #d4af37', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <span style={{ fontSize: '0.72rem', color: '#d4af37', fontWeight: 'bold', textTransform: 'uppercase' }}>Jovens & Famílias</span>
            <h3 style={{ color: '#4a0e17', margin: '0.3rem 0 0.5rem 0' }}>Retiro Geração</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6' }}>
              Um momento forte de avivamento espiritual, deserto, reconciliação e restauração de famílias em Formiga - MG.
            </p>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '16px', borderTop: '5px solid #4a0e17', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <span style={{ fontSize: '0.72rem', color: '#4a0e17', fontWeight: 'bold', textTransform: 'uppercase' }}>Imersão Radical</span>
            <h3 style={{ color: '#4a0e17', margin: '0.3rem 0 0.5rem 0' }}>Acampamento Adventure</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6' }}>
              Experiência de imersão na natureza unindo superação de limites, provas físicas, fraternidade e oração.
            </p>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '16px', borderTop: '5px solid #d4af37', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <span style={{ fontSize: '0.72rem', color: '#d4af37', fontWeight: 'bold', textTransform: 'uppercase' }}>Avivamento</span>
            <h3 style={{ color: '#4a0e17', margin: '0.3rem 0 0.5rem 0' }}>Retiros de Carnaval</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6' }}>
              Alternativa santa para o período festivo com dias inteiros de louvor carismático, adoração e pregações.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: MISSÕES E AÇÕES SOCIAIS */}
      <section id="missoes" style={{ marginBottom: '4rem', backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
        <h2 style={{ color: '#4a0e17', fontSize: '1.75rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <HeartHandshake color="#d4af37" size={28} /> Missões e Ações Sociais
        </h2>
        <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          A fé se traduz em caridade e serviço à comunidade formiguense:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <div style={{ backgroundColor: '#faf8f5', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #4a0e17' }}>
            <h4 style={{ color: '#1a1a1a', margin: '0 0 0.4rem 0' }}>Arrecadação de Cestas Básicas</h4>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
              Campanhas mensais para auxílio de alimentos e itens de higiene a famílias necessitadas.
            </p>
          </div>

          <div style={{ backgroundColor: '#faf8f5', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #d4af37' }}>
            <h4 style={{ color: '#1a1a1a', margin: '0 0 0.4rem 0' }}>Visitas Fraternas</h4>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
              Visitas de oração, escuta e amizade aos idosos em asilos e aos enfermos da comunidade.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7: DOAÇÃO E APOIO FINANCEIRO */}
      <section id="doacao" style={{
        backgroundColor: '#4a0e17',
        color: '#ffffff',
        padding: '3rem 2rem',
        borderRadius: '20px',
        textAlign: 'center',
        borderTop: '6px solid #d4af37',
        boxShadow: '0 10px 30px rgba(74, 14, 23, 0.2)'
      }}>
        <QrCode size={52} color="#d4af37" style={{ marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Apoie a Nossa Missão
        </h2>
        <p style={{ color: '#fef08a', fontSize: '0.95rem', maxWidth: '550px', margin: '0 auto 1.75rem auto', lineHeight: '1.6' }}>
          Sua contribuição financeira mantém a estrutura dos encontros semanais, retiros espirituais e missões sociais.
        </p>

        <div style={{
          backgroundColor: '#ffffff',
          color: '#1a1a1a',
          padding: '1.25rem 2rem',
          borderRadius: '12px',
          display: 'inline-block',
          boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
        }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.5px' }}>
            Chave PIX Oficial (E-mail)
          </span>

          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#4a0e17', margin: '0.3rem 0 0.75rem 0' }}>
            agnusdeirenovacao@gmail.com
          </div>

          <button 
            onClick={copiarPix}
            style={{
              backgroundColor: copiado ? '#16a34a' : '#4a0e17',
              color: '#ffffff',
              border: 'none',
              padding: '0.55rem 1.25rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'background 0.2s'
            }}
          >
            {copiado ? <CheckCircle2 size={16} /> : <Copy size={16} />}
            {copiado ? 'Chave Copiada!' : 'Copiar Chave PIX'}
          </button>
        </div>

        <p style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '1.5rem' }}>
          Grupo de Oração Agnus Dei — Paróquia São Vicente Férrer • Formiga / MG
        </p>
      </section>
    </MainLayout>
  );
};