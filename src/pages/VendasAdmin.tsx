import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Header } from '../components/layout/Header';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  Download,
  MapPin,
} from 'lucide-react';

interface Pedido {
  id: string;
  valor_total: number;
  status: string;
  tipo_venda?: string;
  createdAt?: string;

  cep?: string;
  logradouro?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  numero?: string;
}

function nomeStatus(status: string) {
  const nomes: Record<string, string> = {
    PENDENTE: 'Pendente',
    AGUARDANDO_ENTREGA: 'Aguardando entrega',
    CONCLUIDO: 'Concluído',
    CANCELADO: 'Cancelado',
  };

  return nomes[status] || status.replaceAll('_', ' ');
}

export const VendasAdmin: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  const carregarPedidos = async () => {
    setLoading(true);
    setErro('');

    try {
      const { data } = await api.get('/vendas');

      setPedidos(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setErro(
        e.response?.data?.mensagem ||
        'Não foi possível carregar os pedidos.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const handleMudarStatus = async (
    id: string,
    novoStatus: string
  ) => {
    try {
      await api.patch(`/vendas/${id}/status`, {
        status: novoStatus,
      });

      await carregarPedidos();
    } catch (e: any) {
      alert(
        e.response?.data?.mensagem ||
        'Não foi possível atualizar o status do pedido.'
      );
    }
  };

  const exportarPedidos = () => {
    const dados = pedidos.map((p) => ({
      Pedido: p.id,
      Valor: p.valor_total,
      Status: nomeStatus(p.status),
      Tipo: p.tipo_venda || 'ONLINE',
      Data: p.createdAt
        ? new Date(p.createdAt).toLocaleString('pt-BR')
        : '',
      CEP: p.cep || '',
      Endereço: p.logradouro
        ? `${p.logradouro}, ${p.numero || 's/n'}`
        : '',
      Bairro: p.bairro || '',
      Cidade: p.cidade || '',
      UF: p.uf || '',
    }));

    const csv = [
      Object.keys(dados[0] || {}).join(';'),
      ...dados.map((item) =>
        Object.values(item)
          .map((valor) => `"${String(valor).replaceAll('"', '""')}"`)
          .join(';')
      ),
    ].join('\n');

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'pedidos-agnus.csv';
    link.click();

    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <>
        <Header />

        <main className="admin-page">
          <p>Carregando pedidos...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="admin-page">
        <div className="admin-head">
          <div>
            <span>ADMINISTRAÇÃO</span>

            <h1>Vendas e entregas</h1>

            <p>
              Acompanhe os pedidos, pagamentos e o status das entregas.
            </p>
          </div>

          <div className="admin-actions">
            <button onClick={exportarPedidos}>
              <Download size={16} />
              Exportar
            </button>

            <button onClick={carregarPedidos}>
              Atualizar
            </button>
          </div>
        </div>

        {erro && (
          <div className="admin-error">
            {erro}
          </div>
        )}

        <section className="stats">
          <div className="stat-card">
            <ShoppingBag size={22} />

            <div>
              <span>Total de pedidos</span>
              <strong>{pedidos.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <Clock size={22} />

            <div>
              <span>Aguardando entrega</span>

              <strong>
                {
                  pedidos.filter(
                    (p) => p.status === 'AGUARDANDO_ENTREGA'
                  ).length
                }
              </strong>
            </div>
          </div>

          <div className="stat-card">
            <CheckCircle2 size={22} />

            <div>
              <span>Concluídos</span>

              <strong>
                {
                  pedidos.filter(
                    (p) => p.status === 'CONCLUIDO'
                  ).length
                }
              </strong>
            </div>
          </div>

          <div className="stat-card">
            <XCircle size={22} />

            <div>
              <span>Cancelados</span>

              <strong>
                {
                  pedidos.filter(
                    (p) => p.status === 'CANCELADO'
                  ).length
                }
              </strong>
            </div>
          </div>
        </section>

        <section className="orders-section">
          <div className="section-title">
            <div>
              <h2>Histórico e controle de entregas</h2>

              <p>
                Gerencie os pedidos realizados pelos clientes.
              </p>
            </div>

            <span>
              {pedidos.length} pedido(s)
            </span>
          </div>

          {pedidos.length === 0 ? (
            <div className="empty">
              <ShoppingBag size={38} />

              <h3>Nenhum pedido encontrado</h3>

              <p>
                Os pedidos realizados pelos clientes aparecerão aqui.
              </p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Pedido</th>
                    <th>Data</th>
                    <th>Valor</th>
                    <th>Entrega</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {pedidos.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <strong>
                          #{p.id.slice(0, 8).toUpperCase()}
                        </strong>
                      </td>

                      <td>
                        {p.createdAt
                          ? new Date(
                              p.createdAt
                            ).toLocaleString('pt-BR')
                          : '-'}
                      </td>

                      <td>
                        R$ {Number(p.valor_total).toFixed(2)}
                      </td>

                      <td>
                        <div className="delivery-info">
                          <MapPin size={15} />

                          <div>
                            {p.logradouro ? (
                              <>
                                <strong>
                                  {p.logradouro}, {p.numero || 's/n'}
                                </strong>

                                <small>
                                  {p.bairro || ''} —{' '}
                                  {p.cidade || ''}/{p.uf || ''}
                                </small>

                                {p.cep && (
                                  <small>
                                    CEP: {p.cep}
                                  </small>
                                )}
                              </>
                            ) : (
                              <span>
                                Endereço não informado
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`status status-${p.status.toLowerCase()}`}
                        >
                          {nomeStatus(p.status)}
                        </span>
                      </td>

                      <td>
                        <div className="action-buttons">
                          <button
                            onClick={() =>
                              handleMudarStatus(
                                p.id,
                                'AGUARDANDO_ENTREGA'
                              )
                            }
                            title="Aguardando entrega"
                            disabled={
                              p.status === 'AGUARDANDO_ENTREGA'
                            }
                          >
                            <Clock size={16} />
                          </button>

                          <button
                            onClick={() =>
                              handleMudarStatus(
                                p.id,
                                'CONCLUIDO'
                              )
                            }
                            title="Marcar como entregue"
                            disabled={
                              p.status === 'CONCLUIDO'
                            }
                          >
                            <CheckCircle2 size={16} />
                          </button>

                          <button
                            onClick={() =>
                              handleMudarStatus(
                                p.id,
                                'CANCELADO'
                              )
                            }
                            title="Cancelar e devolver estoque"
                            disabled={
                              p.status === 'CANCELADO'
                            }
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <style>{`
        .admin-page {
          padding: 30px 5%;
          color: #38282a;
        }

        .admin-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }

        .admin-head span {
          font-size: 10px;
          letter-spacing: 2px;
          font-weight: 800;
          color: #a77b3f;
        }

        .admin-head h1 {
          font: 700 38px Georgia, serif;
          color: #4a0e17;
          margin: 8px 0;
        }

        .admin-head p {
          margin: 0;
          color: #82766f;
          font-size: 14px;
        }

        .admin-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .admin-actions button {
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

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 28px;
        }

        .stat-card {
          background: white;
          border: 1px solid #eee4da;
          border-radius: 15px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .stat-card svg {
          color: #a77b3f;
        }

        .stat-card span {
          display: block;
          font-size: 11px;
          color: #82766f;
        }

        .stat-card strong {
          display: block;
          font-size: 24px;
          color: #4a0e17;
          margin-top: 3px;
        }

        .orders-section {
          background: white;
          border: 1px solid #eee4da;
          border-radius: 16px;
          overflow: hidden;
        }

        .section-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          padding: 22px;
          border-bottom: 1px solid #eee4da;
        }

        .section-title h2 {
          margin: 0;
          color: #4a0e17;
          font: 600 24px Georgia, serif;
        }

        .section-title p {
          margin: 5px 0 0;
          color: #82766f;
          font-size: 12px;
        }

        .section-title > span {
          background: #faf2e4;
          color: #795c2d;
          border-radius: 20px;
          padding: 7px 11px;
          font-size: 11px;
          font-weight: 800;
        }

        .table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 950px;
        }

        th,
        td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #f1ece5;
          font-size: 12px;
          vertical-align: middle;
        }

        th {
          background: #faf7f2;
          color: #725a36;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.7px;
        }

        td strong {
          color: #4a0e17;
        }

        .delivery-info {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          min-width: 230px;
        }

        .delivery-info > svg {
          color: #a77b3f;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .delivery-info div {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .delivery-info small {
          color: #82766f;
          font-size: 10px;
        }

        .status {
          display: inline-block;
          padding: 6px 9px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 800;
          white-space: nowrap;
        }

        .status-pendente {
          background: #fff7df;
          color: #89651f;
        }

        .status-aguardando_entrega {
          background: #f5ecff;
          color: #70458f;
        }

        .status-concluido {
          background: #eaf7ed;
          color: #28703c;
        }

        .status-cancelado {
          background: #fff0ee;
          color: #a42e27;
        }

        .action-buttons {
          display: flex;
          gap: 6px;
        }

        .action-buttons button {
          width: 34px;
          height: 34px;
          border: 1px solid #e7ddd1;
          background: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4a0e17;
          cursor: pointer;
        }

        .action-buttons button:hover:not(:disabled) {
          background: #faf5ec;
        }

        .action-buttons button:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .admin-error {
          background: #fff0ee;
          color: #a42e27;
          padding: 12px;
          border-radius: 9px;
          margin-bottom: 20px;
        }

        .empty {
          text-align: center;
          padding: 55px 20px;
        }

        .empty svg {
          color: #a77b3f;
        }

        .empty h3 {
          color: #4a0e17;
          font: 600 23px Georgia, serif;
          margin: 12px 0 6px;
        }

        .empty p {
          color: #82766f;
          margin: 0;
        }

        @media (max-width: 900px) {
          .stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .admin-page {
            padding: 20px 4%;
          }

          .admin-head h1 {
            font-size: 30px;
          }

          .stats {
            grid-template-columns: 1fr;
          }

          .section-title {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};