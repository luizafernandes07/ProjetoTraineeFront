import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Mail,
  Lock,
  Sparkles,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap');

.login-page {
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

.login-container {
  width: 100%;
  max-width: 1050px;
  min-height: 650px;
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  background: #fff;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 25px 80px rgba(63, 19, 25, 0.12);
}

/* BANNER */

.login-banner {
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
  margin-bottom: 45px;
  background: rgba(255, 255, 255, 0.04);
}

.banner-overline {
  color: #d9bd83;
  font-size: 11px;
  letter-spacing: 4px;
  font-weight: 700;
}

.login-banner h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(58px, 7vw, 85px);
  line-height: 1;
  font-weight: 500;
  margin: 16px 0;
  letter-spacing: -3px;
}

.login-banner h1 span {
  color: #d9b878;
}

.gold-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #d9b878;
  margin: 30px 0;
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
  line-height: 1.9;
  max-width: 320px;
}

.banner-verse {
  margin-top: 45px;
  padding-left: 18px;
  border-left: 2px solid #c6a66c;
}

.banner-verse > span {
  color: #d9b878;
}

.banner-verse p {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-style: italic;
  margin: 8px 0;
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

.login-form-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 55px;
  background: #fff;
}

.form-inner {
  width: 100%;
  max-width: 370px;
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
  font-size: 34px;
  font-weight: 600;
  margin: 13px 0 8px;
  letter-spacing: -0.7px;
}

.form-heading p {
  color: #8b8582;
  font-size: 13px;
  margin-bottom: 38px;
}

.field-group {
  margin-bottom: 23px;
}

.field-group label {
  display: block;
  color: #493a38;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 10px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 52px;
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

.forgot-password {
  display: flex;
  justify-content: flex-end;
  margin-top: -8px;
  margin-bottom: 27px;
}

.forgot-password a {
  color: #8b6439;
  text-decoration: none;
  font-size: 11px;
  font-weight: 600;
}

.forgot-password a:hover,
.register-link:hover {
  color: #5c1724;
  text-decoration: underline;
}

.login-button {
  width: 100%;
  height: 53px;
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
  gap: 13px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(74, 14, 23, 0.16);
  transition: all 0.25s ease;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(74, 14, 23, 0.24);
}

.login-button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.login-error {
  background: #fff2f0;
  border: 1px solid #f2d0cb;
  border-radius: 8px;
  padding: 12px;
  color: #a12b24;
  font-size: 12px;
  margin-bottom: 20px;
  line-height: 1.5;
}

.register-area {
  text-align: center;
  margin-top: 35px;
  padding-top: 26px;
  border-top: 1px solid #f0ece7;
}

.register-area p {
  color: #96908c;
  font-size: 12px;
  margin-bottom: 10px;
}

.register-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #5c1724;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.security-note {
  margin-top: 38px;
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
  .login-page {
    padding: 20px;
  }

  .login-container {
    grid-template-columns: 1fr;
    max-width: 480px;
    min-height: auto;
  }

  .login-banner {
    display: none;
  }

  .login-form-section {
    padding: 45px 30px;
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
    margin-bottom: 42px;
  }
}

@media (max-width: 420px) {
  .login-page {
    padding: 12px;
  }

  .login-form-section {
    padding: 35px 22px;
  }

  .form-heading h2 {
    font-size: 29px;
  }
}
`;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await login({ email, senha });
      // O redirecionamento usa o perfil carregado pelo AuthContext.
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      setErro(
        err.response?.data?.mensagem ||
        err.response?.data?.message ||
        err.message ||
        'Não foi possível realizar o login. Verifique seus dados.'
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <main className="login-page">

        <div className="login-container">

          {/* LADO INSTITUCIONAL */}
          <section className="login-banner">

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
                Agnus
                <span>Dei.</span>
              </h1>

              <div className="gold-divider">
                <span />
                ✦
                <span />
              </div>

              <p className="banner-description">
                Um lugar de fé, comunhão e encontro com Deus.
                Faça parte dessa comunidade e caminhe conosco.
              </p>

              <div className="banner-verse">
                <span>✦</span>
                <p>
                  "Eis o Cordeiro de Deus."
                </p>
                <small>João 1, 29</small>
              </div>

            </div>

            <div className="banner-footer">
              PARÓQUIA SÃO VICENTE FERRER
              <span>FORMIGA · MG</span>
            </div>

          </section>

          {/* FORMULÁRIO */}
          <section className="login-form-section">

            <div className="form-inner">

              <div className="mobile-brand">
                <Sparkles size={25} />
                <span>AGNUS DEI</span>
              </div>

              <div className="form-heading">
                <span className="welcome-label">
                  SEJA BEM-VINDO(A)
                </span>

                <h2>
                  Acesse sua conta
                </h2>

                <p>
                  Entre para continuar sua jornada conosco.
                </p>
              </div>

              <form onSubmit={handleLogin}>

                {erro && (
                  <div className="login-error" role="alert">
                    {erro}
                  </div>
                )}

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

                  <div className="password-label">
                    <label htmlFor="senha">
                      Senha
                    </label>
                  </div>

                  <div className="input-wrapper">
                    <Lock size={19} />

                    <input
                      id="senha"
                      type={mostrarSenha ? 'text' : 'password'}
                      placeholder="Digite sua senha"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      autoComplete="current-password"
                      required
                    />

                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                      aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                    >
                      {mostrarSenha
                        ? <EyeOff size={19} />
                        : <Eye size={19} />
                      }
                    </button>
                  </div>

                </div>

                <div className="forgot-password">
                  <Link to="/recuperar-senha">
                    Esqueceu sua senha?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="login-button"
                  disabled={carregando}
                >
                  {carregando ? (
                    'Entrando...'
                  ) : (
                    <>
                      <span>Entrar na minha conta</span>
                      <ArrowRight size={19} />
                    </>
                  )}
                </button>

              </form>

              <div className="register-area">
                <p>
                  Ainda não possui uma conta?
                </p>

                <Link to="/cadastro" className="register-link">
                  Criar minha conta
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