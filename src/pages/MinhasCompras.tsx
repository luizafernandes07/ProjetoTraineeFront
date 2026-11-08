import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Package, RefreshCw } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { api } from '../services/api';

type Compra = {
  id: string;
  valor_total: number | string;
  status: string;
  createdAt?: string;
  forma_pagamento?: string;
  itens?: {
    id: string;
    quantidade: number;
    preco_unitario: number | string;
    produto?: {
      nome: string;
    };
  }[];
};

function nomeStatus(status: string) {
  const nomes: Record<string, string> = {
    PENDENTE: 'Pendente',
    AGUARDANDO_ENTREGA: 'Aguardando entrega',
    CONCLUIDO: 'Concluído',
    CANCELADO: 'Cancelado',
  };

  return nomes[status] || status.replaceAll('_', ' ');
}

export const MinhasCompras: React.FC = () => {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  const carregar = async () => {
    setLoading(true);
    setErro('');

    try {
      const { data } = await api.get('/vendas/minhas-compras');
      setCompras(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setErro(
        e.response?.data?.mensagem ||
        'Não foi possível carregar suas compras.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <MainLayout>
      <section className="orders-page">
        <div className="orders-head">
          <div>
            <span>ÁREA DO CLIENTE</span>

            <h1>Minhas compras</h1>

            <p>
              Acompanhe seus pedidos e o status da entrega.
            </p>
          </div>

          <button onClick={carregar}>
            <RefreshCw size={16} />
            Atualizar
          </button>
        </div>

        {erro && (
          <p className="orders-error">
            {erro}
          </p>
        )}

        {loading ? (
          <p>Carregando seus pedidos...</p>
        ) : compras.length === 0 ? (
          <div className="orders-empty">
            <Package size={34} />

            <h2>Você ainda não fez pedidos</h2>

            <p>
              Quando realizar uma compra, ela aparecerá aqui.
            </p>

            <Link to="/loja">
              Conhecer artigos religiosos
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {compras.map(c => (
              <article
                className="order-card"
                key={c.id}
              >
                <div className="order-top">
                  <strong>
                    Pedido #{c.id.slice(0, 8).toUpperCase()}
                  </strong>

                  <span>
                    {nomeStatus(c.status)}
                  </span>
                </div>

                <p className="order-date">
                  {c.createdAt
                    ? new Date(c.createdAt).toLocaleString('pt-BR')
                    : ''}
                </p>

                {c.itens?.map(i => (
                  <div
                    className="order-item"
                    key={i.id}
                  >
                    <span>
                      {i.quantidade}x{' '}
                      {i.produto?.nome || 'Produto'}
                    </span>

                    <strong>
                      R${' '}
                      {(
                        Number(i.preco_unitario) *
                        i.quantidade
                      ).toFixed(2)}
                    </strong>
                  </div>
                ))}

                <div className="order-total">
                  <span>Total</span>

                  <strong>
                    R$ {Number(c.valor_total).toFixed(2)}
                  </strong>
                </div>

                <p className="order-delivery">
                  <MapPin size={16} />

                  <span>
                    <strong>Entrega:</strong>{' '}
                    seu pedido será entregue no endereço
                    informado durante a compra.
                    <br />

                    <strong>Pagamento:</strong>{' '}
                    {c.forma_pagamento || 'Não informado'}.
                  </span>
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <style>{`
        .orders-page {
          padding: 18px 0 50px;
          color: #38282a;
        }

        .orders-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .orders-head span {
          font-size: 10px;
          letter-spacing: 2px;
          font-weight: 800;
          color: #a77b3f;
        }

        .orders-head h1 {
          font: 700 38px Georgia, serif;
          color: #4a0e17;
          margin: 8px 0;
        }

        .orders-head p,
        .order-date {
          color: #82766f;
          font-size: 13px;
        }

        .orders-head button {
          display: flex;
          align-items: center;
          gap: 7px;
          border: 1px solid #e7ddd1;
          background: white;
          border-radius: 9px;
          padding: 10px 14px;
          color: #4a0e17;
          font-weight: 700;
          cursor: pointer;
        }

        .orders-list {
          display: grid;
          gap: 14px;
          margin-top: 24px;
        }

        .order-card,
        .orders-empty {
          background: #fff;
          border: 1px solid #eee4da;
          border-radius: 16px;
          padding: 21px;
        }

        .order-top,
        .order-item,
        .order-total {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
        }

        .order-top strong {
          color: #4a0e17;
        }

        .order-top span {
          font-size: 11px;
          padding: 6px 9px;
          border-radius: 20px;
          background: #faf2e4;
          color: #795c2d;
          font-weight: 800;
        }

        .order-item {
          padding: 9px 0;
          border-bottom: 1px solid #f1ece5;
          font-size: 13px;
        }

        .order-total {
          padding-top: 14px;
          font-size: 17px;
          color: #4a0e17;
        }

        .order-delivery {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: #faf5ec;
          padding: 12px;
          border-radius: 9px;
          color: #725a36;
          font-size: 12px;
          line-height: 1.6;
          margin-top: 14px;
        }

        .order-delivery svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .orders-empty {
          text-align: center;
          margin-top: 25px;
          padding: 42px;
        }

        .orders-empty svg {
          color: #a77b3f;
        }

        .orders-empty h2 {
          font: 600 25px Georgia, serif;
          color: #4a0e17;
        }

        .orders-empty p {
          color: #82766f;
        }

        .orders-empty a {
          display: inline-block;
          margin-top: 10px;
          background: #4a0e17;
          color: white;
          text-decoration: none;
          padding: 11px 16px;
          border-radius: 9px;
        }

        .orders-error {
          background: #fff0ee;
          color: #a42e27;
          padding: 12px;
          border-radius: 9px;
        }
      `}</style>
    </MainLayout>
  );
};