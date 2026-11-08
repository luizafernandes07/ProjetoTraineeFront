import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import { ShoppingCart, Plus, Trash2, CheckCircle2 } from 'lucide-react';

type Produto = { id: string; nome: string; categoria: string; preco: number; quantidade_estoque?: number; estoque?: number };
type Item = { produto_id: string; nome: string; quantidade: number; preco: number };

export const VendaPresencial: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [itens, setItens] = useState<Item[]>([]);
  const [pagamento, setPagamento] = useState<'DINHEIRO' | 'PIX'>('DINHEIRO');
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const carregar = async () => {
    const { data } = await api.get('/produtos');
    setProdutos(data.map((p: any) => ({ ...p, preco: Number(p.preco) })));
  };
  useEffect(() => { carregar().catch(() => setErro('Não foi possível carregar os produtos para o caixa.')); }, []);

  const total = useMemo(() => itens.reduce((s, i) => s + i.preco * i.quantidade, 0), [itens]);
  const adicionar = () => {
    const p = produtos.find(x => x.id === produtoId);
    if (!p || !Number.isInteger(quantidade) || quantidade < 1) return;
    const estoque = Number(p.quantidade_estoque ?? p.estoque ?? 0);
    const atual = itens.find(i => i.produto_id === p.id)?.quantidade ?? 0;
    if (atual + quantidade > estoque) { setErro(`Estoque insuficiente para ${p.nome}.`); return; }
    setErro('');
    setItens(prev => {
      const existe = prev.find(i => i.produto_id === p.id);
      return existe ? prev.map(i => i.produto_id === p.id ? { ...i, quantidade: i.quantidade + quantidade } : i)
        : [...prev, { produto_id: p.id, nome: p.nome, quantidade, preco: p.preco }];
    });
    setProdutoId(''); setQuantidade(1);
  };
  const finalizar = async () => {
    if (!itens.length) { setErro('Adicione pelo menos um produto.'); return; }
    setSalvando(true); setErro(''); setSucesso('');
    try {
      const { data } = await api.post('/vendas/presencial', {
        forma_pagamento: pagamento,
        itens: itens.map(i => ({ produto_id: i.produto_id, quantidade: i.quantidade }))
      });
      setSucesso(data.mensagem || 'Venda registrada com sucesso.');
      setItens([]); await carregar();
    } catch (e: any) { setErro(e.response?.data?.mensagem || 'Não foi possível registrar a venda.'); }
    finally { setSalvando(false); }
  };

  return <section className="pdv-card" id="caixa-presencial">
    <div className="section-kicker">CAIXA PRESENCIAL</div>
    <h2><ShoppingCart size={23}/> Registrar venda presencial</h2>
    <p className="muted">Registre no caixa as vendas da lanchonete e dos artigos religiosos.</p>
    <div className="pdv-controls">
      <select value={produtoId} onChange={e => setProdutoId(e.target.value)} aria-label="Produto">
        <option value="">Selecione um produto</option>
        {produtos.map(p => <option key={p.id} value={p.id}>{p.nome} · R$ {p.preco.toFixed(2)} · estoque {p.quantidade_estoque ?? p.estoque ?? 0}</option>)}
      </select>
      <input type="number" min="1" value={quantidade} onChange={e => setQuantidade(Math.max(1, Number(e.target.value) || 1))} aria-label="Quantidade" />
      <button type="button" className="gold-button" onClick={adicionar}><Plus size={17}/> Adicionar</button>
    </div>
    {itens.map(i => <div className="pdv-item" key={i.produto_id}><span>{i.quantidade}x {i.nome}</span><strong>R$ {(i.preco * i.quantidade).toFixed(2)}</strong><button type="button" aria-label={`Remover ${i.nome}`} onClick={() => setItens(prev => prev.filter(x => x.produto_id !== i.produto_id))}><Trash2 size={16}/></button></div>)}
    {itens.length > 0 && <>
      <div className="pdv-total"><span>Total da venda</span><strong>R$ {total.toFixed(2)}</strong></div>
      <label className="checkout-label">Forma de pagamento
        <select value={pagamento} onChange={e => setPagamento(e.target.value as 'DINHEIRO' | 'PIX')}><option value="DINHEIRO">Dinheiro</option><option value="PIX">PIX</option></select>
      </label>
      <button type="button" className="primary-button" onClick={finalizar} disabled={salvando}><CheckCircle2 size={18}/> {salvando ? 'Registrando...' : 'Concluir venda presencial'}</button>
    </>}
    {erro && <p className="feedback error">{erro}</p>}{sucesso && <p className="feedback success">{sucesso}</p>}
  </section>;
};
