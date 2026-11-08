import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export const RecuperarSenha: React.FC = () => {
  const [email, setEmail] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const enviar = async (e: React.FormEvent) => {
    e.preventDefault(); setErro(''); setMensagem(''); setEnviando(true);
    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      setMensagem(data.mensagem || 'Se o e-mail estiver cadastrado, você receberá as instruções.');
    } catch (err: any) {
      setErro(err.response?.data?.mensagem || 'Não foi possível solicitar a recuperação. Tente novamente.');
    } finally { setEnviando(false); }
  };
  return <main className="auth-shell"><section className="auth-card"><div className="auth-mark">AΩ</div><span className="auth-eyebrow">AGNUSGESTÃO</span><h1>Esqueceu sua senha?</h1><p>Informe o e-mail cadastrado. Enviaremos um link para você criar uma nova senha.</p><form onSubmit={enviar}><label>E-mail<input type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@email.com"/></label><button disabled={enviando}><Send size={17}/>{enviando ? 'Enviando...' : 'Enviar link de recuperação'}</button></form>{erro && <p className="auth-error">{erro}</p>}{mensagem && <p className="auth-success"><ShieldCheck size={17}/>{mensagem}</p>}<Link className="auth-back" to="/login"><ArrowLeft size={16}/> Voltar para o login</Link></section><style>{authCss}</style></main>;
};

const authCss = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');.auth-shell{min-height:100vh;display:grid;place-items:center;padding:24px;background:radial-gradient(circle at 15% 15%,#f1e5d7,transparent 34%),#f8f5f0;font-family:'DM Sans',sans-serif}.auth-card{width:min(100%,460px);box-sizing:border-box;padding:42px;background:#fff;border:1px solid #eee4da;border-radius:22px;box-shadow:0 22px 65px #3c10151a}.auth-mark{width:52px;height:52px;display:grid;place-items:center;border-radius:50%;background:#4a0e17;color:#dfbd78;font-weight:800;font-size:21px}.auth-eyebrow{display:block;margin-top:22px;color:#a77b3f;letter-spacing:2px;font-size:10px;font-weight:800}.auth-card h1{font:700 34px 'Playfair Display',serif;color:#4a0e17;margin:9px 0}.auth-card>p{color:#80736e;line-height:1.65;font-size:14px}.auth-card label{display:block;margin:22px 0 14px;color:#51413e;font-weight:700;font-size:13px}.auth-card input{display:block;box-sizing:border-box;width:100%;margin-top:8px;padding:13px;border:1px solid #e4d9cd;border-radius:9px;font:inherit}.auth-card button{width:100%;display:flex;justify-content:center;align-items:center;gap:9px;border:0;border-radius:9px;padding:14px;background:#4a0e17;color:white;font-weight:800;cursor:pointer}.auth-card button:disabled{opacity:.6}.auth-back{display:flex;justify-content:center;align-items:center;gap:7px;margin-top:24px;color:#6d4a43;text-decoration:none;font-size:13px;font-weight:700}.auth-error,.auth-success{padding:12px;border-radius:9px;font-size:13px}.auth-error{background:#fff0ee;color:#a42e27}.auth-success{display:flex;gap:8px;background:#edf8ef;color:#246b39}.auth-success svg{flex-shrink:0}@media(max-width:520px){.auth-card{padding:28px 22px}}`;
