import React, { useEffect, useState } from 'react';
import { ArrowDownCircle, ArrowUpCircle, Download, PlusCircle, RefreshCw, Trash2, Wallet } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { api } from '../services/api';

type Movimento = { id: string; tipo: 'ENTRADA' | 'SAIDA'; valor: number | string; descricao: string; data_movimentacao?: string; usuario?: { nome: string }; venda_id?: string | null };
type ResumoCaixa = { entradas: number; saidas: number; saldo: number; quantidade_movimentacoes?: number };

const resumoVazio: ResumoCaixa = { entradas: 0, saidas: 0, saldo: 0, quantidade_movimentacoes: 0 };
const calcularResumoLocal = (lista: Movimento[]): ResumoCaixa => {
  const totais = lista.reduce((acc, movimento) => {
    const centavos = Math.round(Number(movimento.valor) * 100);
    if (!Number.isFinite(centavos) || centavos < 0) return acc;
    if (String(movimento.tipo).toUpperCase() === 'ENTRADA') acc.entradas += centavos;
    if (String(movimento.tipo).toUpperCase() === 'SAIDA') acc.saidas += centavos;
    return acc;
  }, { entradas: 0, saidas: 0 });
  return { entradas: totais.entradas / 100, saidas: totais.saidas / 100, saldo: (totais.entradas - totais.saidas) / 100, quantidade_movimentacoes: lista.length };
};
export const FinanceiroAdmin: React.FC = () => {
  const [movimentos,setMovimentos]=useState<Movimento[]>([]); const [resumo,setResumo]=useState<ResumoCaixa>(resumoVazio); const [tipo,setTipo]=useState<'ENTRADA'|'SAIDA'>('ENTRADA'); const [valor,setValor]=useState(''); const [descricao,setDescricao]=useState(''); const [loading,setLoading]=useState(true); const [salvando,setSalvando]=useState(false); const [erro,setErro]=useState(''); const [sucesso,setSucesso]=useState('');
  const carregar=async()=>{
    setLoading(true); setErro('');
    try {
      const respostaMovimentos = await api.get('/movimentacoes');
      const lista: Movimento[] = Array.isArray(respostaMovimentos.data) ? respostaMovimentos.data : [];
      setMovimentos(lista);
      try {
        // O resumo vem do backend, calculado diretamente sobre os registros persistidos.
        const respostaResumo = await api.get('/movimentacoes/resumo');
        const dados = respostaResumo.data || {};
        const entradas = Number(dados.entradas);
        const saidas = Number(dados.saidas);
        const saldo = Number(dados.saldo);
        if ([entradas, saidas, saldo].every(Number.isFinite)) {
          setResumo({ entradas, saidas, saldo, quantidade_movimentacoes: Number(dados.quantidade_movimentacoes) || lista.length });
        } else {
          setResumo(calcularResumoLocal(lista));
        }
      } catch {
        // Compatibilidade: se o endpoint de resumo ainda não estiver disponível, calcula pela lista.
        setResumo(calcularResumoLocal(lista));
      }
    } catch(e:any) {
      setErro(e.response?.data?.mensagem||e.response?.data?.error?.message||'Não foi possível carregar o caixa.');
    } finally { setLoading(false); }
  };
  useEffect(()=>{carregar();},[]);
  const salvar=async(e:React.FormEvent)=>{e.preventDefault();setErro('');setSucesso('');const n=Number(valor);if(!Number.isFinite(n)||n<=0){setErro('Informe um valor maior que zero.');return;}if(!descricao.trim()){setErro('Informe uma descrição.');return;}setSalvando(true);try{await api.post('/movimentacoes',{tipo,valor:n,descricao:descricao.trim()});setSucesso('Movimentação registrada.');setValor('');setDescricao('');await carregar();}catch(e:any){setErro(e.response?.data?.mensagem||'Não foi possível registrar a movimentação.');}finally{setSalvando(false);}};
  const exportar=async(formato:'csv'|'excel')=>{try{const {data}=await api.get(`/movimentacoes/exportar?formato=${formato}`,{responseType:'blob'});const url=URL.createObjectURL(data);const a=document.createElement('a');a.href=url;a.download=`relatorio_caixa_agnus.${formato==='csv'?'csv':'xlsx'}`;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);}catch{setErro('Não foi possível exportar o relatório.');}};
  const excluir=async(id:string)=>{if(!window.confirm('Deseja excluir esta movimentação manual?'))return;try{await api.delete(`/movimentacoes/${id}`);setSucesso('Movimentação removida.');await carregar();}catch(e:any){setErro(e.response?.data?.mensagem||'Não foi possível remover.');}};
  return <MainLayout><section className="finance-page"><div className="finance-hero"><span>PAINEL ADMINISTRATIVO</span><h1>Caixa e financeiro</h1><p>Acompanhe entradas, saídas e movimentações geradas pelas vendas presenciais.</p></div><div className="finance-summary"><article><ArrowUpCircle/><small>Total de entradas</small><strong>R$ {resumo.entradas.toFixed(2)}</strong></article><article><ArrowDownCircle/><small>Total de saídas</small><strong>R$ {resumo.saidas.toFixed(2)}</strong></article><article><Wallet/><small>Saldo atual do caixa</small><strong>R$ {resumo.saldo.toFixed(2)}</strong></article></div><div className="finance-grid"><form className="finance-form" onSubmit={salvar}><h2>Nova movimentação</h2><label>Tipo<select value={tipo} onChange={e=>setTipo(e.target.value as 'ENTRADA'|'SAIDA')}><option value="ENTRADA">Entrada</option><option value="SAIDA">Saída</option></select></label><label>Valor (R$)<input type="number" min="0.01" step="0.01" required value={valor} onChange={e=>setValor(e.target.value)} placeholder="0,00"/></label><label>Descrição<input value={descricao} onChange={e=>setDescricao(e.target.value)} required placeholder="Ex.: oferta, doação ou despesa"/></label><button disabled={salvando}><PlusCircle size={17}/>{salvando?'Salvando...':'Registrar movimentação'}</button></form><section className="finance-history"><div className="finance-history-head"><h2>Histórico do caixa</h2><div><button onClick={()=>exportar('excel')}><Download size={15}/> Excel</button><button onClick={()=>exportar('csv')}><Download size={15}/> CSV</button><button onClick={carregar}><RefreshCw size={15}/></button></div></div>{erro&&<p className="finance-error">{erro}</p>}{sucesso&&<p className="finance-success">{sucesso}</p>}{loading?<p>Carregando movimentações...</p>:movimentos.length===0?<p className="finance-muted">Nenhuma movimentação registrada.</p>:<div className="finance-table-wrap"><table><thead><tr><th>Data</th><th>Descrição</th><th>Responsável</th><th>Tipo</th><th>Valor</th><th></th></tr></thead><tbody>{movimentos.map(m=><tr key={m.id}><td>{m.data_movimentacao?new Date(m.data_movimentacao).toLocaleString('pt-BR'):'-'}</td><td>{m.descricao}</td><td>{m.usuario?.nome||'-'}</td><td><span className={m.tipo==='ENTRADA'?'finance-in':'finance-out'}>{m.tipo}</span></td><td>R$ {Number(m.valor).toFixed(2)}</td><td>{!m.venda_id&&<button className="finance-delete" title="Excluir movimentação manual" onClick={()=>excluir(m.id)}><Trash2 size={15}/></button>}</td></tr>)}</tbody></table></div>}</section></div></section><style>{`.finance-page{padding:18px 0 48px;color:#38282a}.finance-hero{padding:30px;border-radius:19px;background:linear-gradient(120deg,#350d17,#681e2c);color:#fff8ed}.finance-hero span{font-size:10px;letter-spacing:2px;font-weight:800;color:#dfbd78}.finance-hero h1{font:700 36px Georgia,serif;margin:10px 0}.finance-hero p{color:#eadbd2;margin:0}.finance-summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:18px 0}.finance-summary article,.finance-form,.finance-history{background:#fff;border:1px solid #eee4da;border-radius:15px;padding:19px}.finance-summary article{display:grid;gap:7px}.finance-summary svg{color:#a77b3f}.finance-summary small{color:#81746e}.finance-summary strong{font-size:22px;color:#4a0e17}.finance-grid{display:grid;grid-template-columns:280px minmax(0,1fr);gap:16px;align-items:start}.finance-form h2,.finance-history h2{font:600 22px Georgia,serif;color:#4a0e17;margin:0 0 18px}.finance-form label{display:block;font-size:12px;font-weight:800;color:#594741;margin:14px 0}.finance-form input,.finance-form select{box-sizing:border-box;width:100%;padding:11px;margin-top:7px;border:1px solid #e4d9cd;border-radius:8px;font:inherit}.finance-form>button,.finance-history-head button{display:inline-flex;align-items:center;justify-content:center;gap:7px;border:0;border-radius:8px;padding:10px 12px;background:#4a0e17;color:white;font-weight:800;cursor:pointer}.finance-form>button{width:100%;margin-top:5px}.finance-history-head{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}.finance-history-head>div{display:flex;gap:6px}.finance-history-head button{background:#f4eee6;color:#4a0e17}.finance-table-wrap{overflow:auto}table{width:100%;border-collapse:collapse;font-size:12px;text-align:left}th,td{padding:12px 9px;border-bottom:1px solid #f0eae3;white-space:nowrap}th{color:#7b6c65;background:#fcfaf7}.finance-in,.finance-out{font-size:10px;font-weight:800;padding:5px 7px;border-radius:20px}.finance-in{background:#edf8ef;color:#246b39}.finance-out{background:#fff0ee;color:#a42e27}.finance-delete{border:0;background:transparent;color:#b33b3b;cursor:pointer}.finance-muted{color:#857873}.finance-error,.finance-success{padding:10px;border-radius:8px;font-size:12px}.finance-error{background:#fff0ee;color:#a42e27}.finance-success{background:#edf8ef;color:#246b39}@media(max-width:850px){.finance-grid{grid-template-columns:1fr}}@media(max-width:600px){.finance-summary{grid-template-columns:1fr}.finance-hero{padding:23px}}`}</style></MainLayout>;
};
