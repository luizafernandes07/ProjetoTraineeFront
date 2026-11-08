import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import {
  Mail,
  Lock,
  User,
  Sparkles,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap');

.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 35px;
  background:
    radial-gradient(circle at 10% 10%, #f4e8d9 0%, transparent 35%),
    #f8f5f0;
  font-family: 'DM Sans', sans-serif;
  box-sizing: border-box;
}

.register-container {
  width: 100%;
  max-width: 1050px;
  min-height: 700px;
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  background: #fff;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 25px 80px rgba(63, 19, 25, 0.12);
}

/* BANNER INSTITUCIONAL */

.register-banner {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 55px 48px 35px;
  color: #fffaf0;
  background:
    radial-gradient(ellipse at 80% 20%, rgba(130, 65, 57, 0.5), transparent 45%),
    linear-gradient(145deg, #5c1724, #390b15 75%);
}

.banner-content {
  position: relative;
  z-index: 2;
  margin: auto 0;
}

.brand-symbol {
  width: 65px;
  height: 65px;
  border: 1px solid rgba(218, 185, 117, 0.55);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dfbd78;
  margin-bottom: 35px;
  background: rgba(255, 255, 255, 0.04);
}

.banner-overline {
  color: #d9bd83;
  font-size: 11px;
  letter-spacing: 4px;
  font-weight: 700;
}

.register-banner h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(48px, 6vw, 75px);
  line-height: 1.05;
  font-weight: 500;
  margin: 16px 0;
  letter-spacing: -2px;
}

.register-banner h1 span {
  color: #d9b878;
}

.gold-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #d9b878;
  margin: 25px 0;
  font-size: 15px;
}

.gold-divider span {
  width: 45px;
  height: 1px;
  background: #b99659;
}

.banner-description {
  color: rgba(255, 250, 240, 0.78);
  font-size: 14px;
  line-height: 1.8;
  max-width: 320px;
}

.banner-verse {
  margin-top: 35px;
  padding-left: 18px;
  border-left: 2px solid #c6a66c;
}

.banner-verse > span {
  color: #d9b878;
}

.banner-verse p {
  font-family: 'Playfair Display', serif;
  font-size: 17px;
  font-style: italic;
  margin: 6px 0;
}

.banner-verse small {
  color: #d9b878;
  font-size: 11px;
  letter-spacing: 1px;
}

.banner-footer {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 7px;
  color: #d8bd88;
  font-size: 10px;
  letter-spacing: 2px;
  font-weight: 700;
}

.banner-footer span {
  color: rgba(255, 255, 255, 0.55);
  font-size: 9px;
}

.banner-decoration {
  position: absolute;
  border: 1px solid rgba(218, 185, 117, 0.12);
  border-radius: 50%;
}

.decoration-one {
  width: 370px;
  height: 370px;
  right: -190px;
  top: -120px;
}

.decoration-two {
  width: 290px;
  height: 290px;
  right: -150px;
  top: -80px;
}

/* FORMULÁRIO */

.register-form-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 45px 55px;
  background: #fff;
}

.form-inner {
  width: 100%;
  max-width: 380px;
}

.mobile-brand {
  display: none;
}

.welcome-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2.5px;
  color: #a47d49;
}

.form-heading h2 {
  font-family: 'Playfair Display', serif;
  color: #46121d;
  font-size: 32px;
  font-weight: 600;
  margin: 10px 0 6px;
  letter-spacing: -0.7px;
}

.form-heading p {
  color: #8b8582;
  font-size: 13px;
  margin-bottom: 28px;
}

.field-group {
  margin-bottom: 18px;
}

.field-group label {
  display: block;
  color: #493a38;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 8px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 48px;
  padding: 0 15px;
  border: 1px solid #e9e3dc;
  border-radius: 9px;
  color: #a68c79;
  background: #fdfcfa;
  transition: all 0.2s ease;
}

.input-wrapper:focus-within {
  border-color: #a47d49;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(164, 125, 73, 0.10);
}

.input-wrapper input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: #39282a;
  font-family: inherit;
  font-size: 13px;
}

.input-wrapper input::placeholder {
  color: #b8b0aa;
}

.toggle-password {
  border: none;
  background: transparent;
  color: #9c8d83;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
}

.register-button {
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 9px;
  background: linear-gradient(110deg, #641d2b, #45101b);
  color: #fff;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(74, 14, 23, 0.16);
  transition: all 0.25s ease;
  margin-top: 10px;
}

.register-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(74, 14, 23, 0.24);
}

.register-button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.register-error {
  background: #fff2f0;
  border: 1px solid #f2d0cb;
  border-radius: 8px;
  padding: 12px;
  color: #a12b24;
  font-size: 12px;
  margin-bottom: 18px;
  line-height: 1.5;
}

.register-success {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  padding: 24px 16px;
  color: #15803d;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.register-success strong {
  font-size: 16px;
  font-family: 'Playfair Display', serif;
}

.register-success p {
  font-size: 13px;
  color: #166534;
  margin: 0;
}

.login-area {
  text-align: center;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid #f0ece7;
}

.login-area p {
  color: #96908c;
  font-size: 12px;
  margin-bottom: 8px;
}

.login-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #5c1724;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}

.security-note {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #aaa19a;
  font-size: 10px;
  text-align: center;
}

.security-note svg {
  color: #a68b62;
  flex-shrink: 0;
}

/* RESPONSIVIDADE */

@media (max-width: 800px) {
  .register-page {
    padding: 20px;
  }

  .register-container {
    grid-template-columns: 1fr;
    max-width: 480px;
    min-height: auto;
  }

  .register-banner {
    display: none;
  }

  .register-form-section {
    padding: 40px 28px;
  }

  .mobile-brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: #a47d49;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 3px;
    margin-bottom: 30px;
  }
}

@media (max-width: 420px) {
  .register-page {
    padding: 12px;
  }

  .register-form-section {
    padding: 30px 20px;
  }

  .form-heading h2 {
    font-size: 27px;
  }
}
`;

export const Cadastro: React.FC = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    if (senha.length < 8) {
      setErro('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    setCarregando(true);

    try {
      await api.post('/auth/register', { nome, email, senha });
      setSucesso(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setErro(
        err.response?.data?.mensagem ||
        err.response?.data?.message ||
        'Erro ao realizar cadastro. Tente novamente.'
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <main className="register-page">

        <div className="register-container">

          {/* LADO INSTITUCIONAL */}
          <section className="register-banner">

            <div className="banner-decoration decoration-one" />
            <div className="banner-decoration decoration-two" />

            <div className="banner-content">

              <div className="brand-symbol">
                <Sparkles size={30} strokeWidth={1.5} />
              </div>

              <span className="banner-overline">
                GRUPO DE ORAÇÃO
              </span>

              <h1>
                Junte-se a
                <span>Nós.</span>
              </h1>

              <div className="gold-divider">
                <span />
                ✦
                <span />
              </div>

              <p className="banner-description">
                Crie sua conta para adquirir nossos artigos religiosos e fortalecer sua caminhada espiritual conosco.
              </p>

              <div className="banner-verse">
                <span>✦</span>
                <p>
                  "Vinde a mim todos vós."
                </p>
                <small>Mateus 11, 28</small>
              </div>

            </div>

            <div className="banner-footer">
              PARÓQUIA SÃO VICENTE FERRER
              <span>FORMIGA · MG</span>
            </div>

          </section>

          {/* FORMULÁRIO */}
          <section className="register-form-section">

            <div className="form-inner">

              <div className="mobile-brand">
                <Sparkles size={25} />
                <span>AGNUS DEI</span>
              </div>

              <div className="form-heading">
                <span className="welcome-label">
                  NOVO CADASTRO
                </span>

                <h2>
                  Crie sua conta
                </h2>

                <p>
                  Preencha seus dados para se cadastrar.
                </p>
              </div>

              {sucesso ? (
                <div className="register-success">
                  <CheckCircle2 size={40} color="#16a34a" />
                  <strong>Cadastro realizado!</strong>
                  <p>Redirecionando para a tela de login...</p>
                </div>
              ) : (
                <form onSubmit={handleRegister}>

                  {erro && (
                    <div className="register-error" role="alert">
                      {erro}
                    </div>
                  )}

                  <div className="field-group">
                    <label htmlFor="nome">
                      Nome Completo
                    </label>
                    <div className="input-wrapper">
                      <User size={19} />
                      <input
                        id="nome"
                        type="text"
                        placeholder="Seu nome completo"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        autoComplete="name"
                        required
                      />
                    </div>
                  </div>

                  <div className="field-group">
                    <label htmlFor="email">
                      E-mail
                    </label>
                    <div className="input-wrapper">
                      <Mail size={19} />
                      <input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="field-group">
                    <label htmlFor="senha">
                      Senha
                    </label>
                    <div className="input-wrapper">
                      <Lock size={19} />
                      <input
                        id="senha"
                        type={mostrarSenha ? 'text' : 'password'}
                        placeholder="Mínimo 8 caracteres"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        autoComplete="new-password"
                        required
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                        aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                      >
                        {mostrarSenha ? <EyeOff size={19} /> : <Eye size={19} />}
                      </button>
                    </div>
                  </div>

                  <div className="field-group">
                    <label htmlFor="confirmarSenha">
                      Confirmar Senha
                    </label>
                    <div className="input-wrapper">
                      <Lock size={19} />
                      <input
                        id="confirmarSenha"
                        type={mostrarConfirmarSenha ? 'text' : 'password'}
                        placeholder="Repita a senha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        autoComplete="new-password"
                        required
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                        aria-label={mostrarConfirmarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                      >
                        {mostrarConfirmarSenha ? <EyeOff size={19} /> : <Eye size={19} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="register-button"
                    disabled={carregando}
                  >
                    {carregando ? (
                      'Cadastrando...'
                    ) : (
                      <>
                        <span>Finalizar Cadastro</span>
                        <ArrowRight size={19} />
                      </>
                    )}
                  </button>

                </form>
              )}

              <div className="login-area">
                <p>
                  Já possui uma conta?
                </p>

                <Link to="/login" className="login-link">
                  Fazer Login
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="security-note">
                <ShieldCheck size={17} />
                <span>Seus dados são protegidos e utilizados com segurança.</span>
              </div>

            </div>

          </section>

        </div>

      </main>
    </>
  );
};