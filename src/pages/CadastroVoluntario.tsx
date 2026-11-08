import React, { useEffect, useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { api } from '../services/api';
import { UserPlus, Users, Pencil, UserX, UserCheck, Save, X } from 'lucide-react';

type Voluntario = { id: string; nome: string; email: string; perfil: string; ativo?: boolean };

export const CadastroVoluntario: React.FC = () => {
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [editando, setEditando] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  const carregar = async () => {
    try {
      const { data } = await api.get('/usuarios');
      setVoluntarios((Array.isArray(data) ? data : []).filter((u: Voluntario) => u.perfil === 'VOLUNTARIO'));
    } catch (e: any) { setErro(e.response?.data?.mensagem || 'Não foi possível carregar os voluntários.'); }
  };
  useEffect(() => { carregar(); }, []);

  const limpar = () => { setNome(''); setEmail(''); setSenha(''); setEditando(null); };
  const salvar = async (e: React.FormEvent) => {
    e.preventDefault(); setErro(''); setMensagem(''); setLoading(true);
    try {
      if (editando) {
        const payload: Record<string, string> = { nome, email };
        if (senha.trim()) payload.senha = senha;
        await api.put(`/usuarios/${editando}`, payload);
        setMensagem('Dados do voluntário atualizados.');
      } else {
        await api.post('/usuarios', { nome, email, senha });
        setMensagem('Voluntário cadastrado com sucesso.');
      }
      limpar(); await carregar();
    } catch (e: any) { setErro(e.response?.data?.mensagem || 'Não foi possível salvar os dados.'); }
    finally { setLoading(false); }
  };
  const editar = (u: Voluntario) => { setEditando(u.id); setNome(u.nome); setEmail(u.email); setSenha(''); setErro(''); setMensagem(''); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const alternarAtivo = async (u: Voluntario) => {
    setErro(''); setMensagem('');
    try {
      if (u.ativo === false) await api.put(`/usuarios/${u.id}`, { ativo: true });
      else await api.delete(`/usuarios/${u.id}`);
      setMensagem(u.ativo === false ? 'Voluntário reativado.' : 'Acesso do voluntário desativado.');
      await carregar();
    } catch (e: any) { setErro(e.response?.data?.mensagem || 'Não foi possível alterar o acesso.'); }
  };

  return <MainLayout>
    <style>{`.vol-page{padding:12px 0 35px;color:#38282a}.vol-panel{background:white;border:1px solid #eee4da;border-radius:17px;padding:24px;box-shadow:0 7px 22px #4a0e1708;margin-bottom:22px}.vol-panel h2{font:600 27px Georgia,serif;color:#4a0e17;margin:8px 0 18px}.vol-form{display:grid;grid-template-columns:1fr 1fr;gap:13px}.vol-form label{font-size:12px;font-weight:800;color:#65534e}.vol-form input{width:100%;box-sizing:border-box;margin-top:6px;padding:11px;border:1px solid #e4d9cd;border-radius:9px}.vol-submit{grid-column:1/-1;display:flex;gap:9px}.vol-submit button{border:0;border-radius:9px;padding:11px 15px;background:#4a0e17;color:white;font-weight:800;cursor:pointer}.vol-table{width:100%;border-collapse:collapse;font-size:13px}.vol-table th,.vol-table td{text-align:left;padding:13px 10px;border-bottom:1px solid #eee7df}.vol-table th{color:#80664a;font-size:11px;text-transform:uppercase;letter-spacing:1px}.vol-action{border:1px solid #e8ded2;background:#fff;border-radius:8px;padding:7px;cursor:pointer;color:#4a0e17;margin-right:5px}.vol-status{font-size:11px;font-weight:800;border-radius:30px;padding:5px 9px;background:#edf8ef;color:#267341}.vol-status.off{background:#fff0ee;color:#a42e27}@media(max-width:600px){.vol-form{grid-template-columns:1fr}.vol-submit{grid-column:auto}.vol-table{min-width:600px}.vol-overflow{overflow-x:auto}}`}</style>
    <div className="vol-page">
      <div className="vol-panel"><div style={{ color: '#a77b3f', fontSize: 11, fontWeight: 800, letterSpacing: 2 }}>ADMINISTRAÇÃO DE ACESSOS</div><h2><UserPlus size={24} style={{ verticalAlign: 'middle', marginRight: 8 }}/> {editando ? 'Editar voluntário' : 'Cadastrar voluntário'}</h2>
        {erro && <p style={{ color: '#a42e27', background: '#fff0ee', padding: 10, borderRadius: 8 }}>{erro}</p>}{mensagem && <p style={{ color: '#267341', background: '#edf8ef', padding: 10, borderRadius: 8 }}>{mensagem}</p>}
        <form onSubmit={salvar} className="vol-form"><label>Nome completo<input value={nome} onChange={e => setNome(e.target.value)} required placeholder="Nome do voluntário"/></label><label>E-mail<input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="email@exemplo.com"/></label><label style={{ gridColumn: '1/-1' }}>Senha {editando ? '(deixe em branco para manter a atual)' : '(mínimo 8 caracteres)'}<input type="password" value={senha} onChange={e => setSenha(e.target.value)} required={!editando} minLength={8} placeholder="Senha de acesso"/></label><div className="vol-submit"><button type="submit" disabled={loading}><Save size={16} style={{ verticalAlign: 'middle', marginRight: 5 }}/>{loading ? 'Salvando...' : editando ? 'Salvar alterações' : 'Cadastrar voluntário'}</button>{editando && <button type="button" onClick={limpar} style={{ background: '#eee7df', color: '#4a0e17' }}><X size={16} style={{ verticalAlign: 'middle', marginRight: 5 }}/>Cancelar edição</button>}</div></form>
      </div>
      <div className="vol-panel"><h2><Users size={23} style={{ verticalAlign: 'middle', marginRight: 8 }}/>Voluntários cadastrados</h2><div className="vol-overflow"><table className="vol-table"><thead><tr><th>Nome</th><th>E-mail</th><th>Status</th><th>Ações</th></tr></thead><tbody>{voluntarios.map(u => <tr key={u.id}><td><strong>{u.nome}</strong></td><td>{u.email}</td><td><span className={`vol-status ${u.ativo === false ? 'off' : ''}`}>{u.ativo === false ? 'Inativo' : 'Ativo'}</span></td><td><button className="vol-action" title="Editar" onClick={() => editar(u)}><Pencil size={15}/></button><button className="vol-action" title={u.ativo === false ? 'Reativar' : 'Desativar'} onClick={() => alternarAtivo(u)}>{u.ativo === false ? <UserCheck size={15}/> : <UserX size={15}/>}</button></td></tr>)}{!voluntarios.length && <tr><td colSpan={4} style={{ color: '#8a7d75', textAlign: 'center' }}>Nenhum voluntário cadastrado.</td></tr>}</tbody></table></div></div>
    </div>
  </MainLayout>;
};
