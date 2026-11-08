import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import {
  Package,
  ShoppingCart,
  Users,
  ArrowUpRight,
  ShieldCheck,
  Wallet,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const atalhos = [
    {
      titulo: 'Produtos',
      descricao:
        'Cadastre, edite, consulte e desative produtos da loja e da lanchonete.',
      destino: '/produtos',
      icone: Package,
      acao: 'Gerenciar produtos',
    },

    {
      titulo: 'Vendas e caixa',
      descricao:
        'Acompanhe pedidos online, vendas presenciais, entregas e status.',
      destino: '/vendas-admin',
      icone: ShoppingCart,
      acao: 'Acessar vendas',
    },

    {
      titulo: 'Voluntários',
      descricao:
        'Cadastre e gerencie os acessos dos membros servidores.',
      destino: '/cadastro-voluntario',
      icone: Users,
      acao: 'Gerenciar voluntários',
    },

    {
      titulo: 'Caixa e financeiro',
      descricao:
        'Registre entradas e saídas, consulte o saldo e exporte relatórios.',
      destino: '/financeiro',
      icone: Wallet,
      acao: 'Acessar financeiro',
    },
  ];

  return (
    <MainLayout>
      <style>{`
        .admin-home {
          padding: 12px 0 35px;
          color: #38282a;
        }

        .admin-hero {
          padding: 38px;
          border-radius: 22px;
          background: linear-gradient(120deg, #350d17, #681e2c);
          color: #fff8ed;
          border-bottom: 4px solid #d4af37;
        }

        .admin-hero h1 {
          font: 600 clamp(30px, 4vw, 44px) Georgia, serif;
          margin: 12px 0;
        }

        .admin-hero p {
          color: #eadbd2;
          max-width: 650px;
          line-height: 1.7;
        }

        .admin-kicker {
          font-size: 11px;
          letter-spacing: 2px;
          color: #d9b878;
          font-weight: 800;
          text-transform: uppercase;
        }

        .admin-grid {
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(230px, 1fr)
          );
          gap: 17px;
          margin-top: 25px;
        }

        .admin-tile {
          background: white;
          border: 1px solid #eee4da;
          border-radius: 17px;
          padding: 23px;
          box-shadow: 0 8px 25px #4a0e1709;
        }

        .admin-tile svg {
          color: #9a713a;
        }

        .admin-tile h2 {
          font: 600 24px Georgia, serif;
          color: #4a0e17;
          margin: 15px 0 8px;
        }

        .admin-tile p {
          font-size: 13px;
          color: #82766f;
          line-height: 1.65;
          min-height: 65px;
        }

        .admin-tile button {
          border: 0;
          border-radius: 9px;
          background: #4a0e17;
          color: white;
          padding: 11px 14px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .admin-tile button:hover {
          background: #681e2c;
        }

        .admin-note {
          margin-top: 22px;
          padding: 16px 18px;
          background: #faf4e9;
          border: 1px solid #eadcc4;
          border-radius: 13px;
          color: #6d5737;
          font-size: 13px;
        }

        @media (max-width: 600px) {
          .admin-hero {
            padding: 25px 20px;
          }

          .admin-hero h1 {
            font-size: 32px;
          }

          .admin-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="admin-home">

        <section className="admin-hero" id="inicio">
          <div className="admin-kicker">
            Painel administrativo · AgnusGestão
          </div>

          <h1>
            Bem-vindo ao painel de gestão.
          </h1>

          <p>
            Gerencie os produtos, acompanhe as vendas e organize
            os acessos dos voluntários do Grupo de Oração Agnus Dei
            em um só lugar.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              color: '#e4c98f',
              fontSize: 12,
              marginTop: 18,
            }}
          >
            <ShieldCheck size={17} />
            Acesso de administrador
          </div>
        </section>

        <section className="admin-grid">
          {atalhos.map((item) => {
            const Icon = item.icone;

            return (
              <article
                className="admin-tile"
                key={item.destino}
              >
                <Icon size={27} />

                <h2>
                  {item.titulo}
                </h2>

                <p>
                  {item.descricao}
                </p>

                <button
                  onClick={() => navigate(item.destino)}
                >
                  {item.acao}

                  <ArrowUpRight size={16} />
                </button>
              </article>
            );
          })}
        </section>

        <div className="admin-note">
          Atenção: clientes não têm acesso às rotinas administrativas
          nem às vendas presenciais da lanchonete. Essas permissões
          também são validadas pela API.
        </div>

      </div>
    </MainLayout>
  );
};