
import { useEffect, useState } from 'react';
import {
  obtenerDatosPedidos,
  type DatosPedidos,
} from './adminPedidos.service';
import type { PedidoReparto } from './adminPedidos.types';
import './AdminPedidos.css';

const formatoCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

function AdminPedidos() {
  const [datos, setDatos] = useState<DatosPedidos | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  useEffect(() => {
    let activo = true;

    obtenerDatosPedidos()
      .then((resultado) => {
        if (activo) setDatos(resultado);
      })
      .catch(() => {
        if (activo) setError('No fue posible cargar los pedidos.');
      });

    return () => {
      activo = false;
    };
  }, []);

  if (error) {
    return <div className="pedidos-page"><p role="alert">{error}</p></div>;
  }

  if (!datos) {
    return (
      <div className="pedidos-page">
        <p>Cargando pedidos...</p>
      </div>
    );
  }

  const { contabilidad, pedidos, resumen } = datos;

  const pedidosFiltrados = pedidos.filter((pedido) =>
    filtroEstado === 'Todos' || pedido.estado === filtroEstado
  );

  return (
    <div className="pedidos-page">
      <header className="pedidos-summary">
        <span className="pedidos-eyebrow">RACIONES DEL MES</span>
        <strong className="pedidos-total">
          {resumen.totalRaciones}
        </strong>
        <p className="pedidos-caption">
          {resumen.repartidas} repartidas · {resumen.porRepartir} por repartir
          · {formatoCLP.format(resumen.montoTotal)} en total
        </p>
      </header>

      <div className="pedidos-overview">
        <section className="pedidos-card accounting-card">
          <h2>Contabilidad por tipo de comida</h2>

          <div className="pedidos-table-scroll">
            <table className="pedidos-table accounting-table">
              <thead>
                <tr>
                  <th>Comida</th>
                  <th className="number-cell">Cantidad</th>
                  <th className="number-cell">Valor unitario</th>
                  <th className="number-cell">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {contabilidad.map((comida) => (
                  <tr key={comida.tipo}>
                    <td>{comida.tipo}</td>
                    <td className="number-cell">{comida.cantidad}</td>
                    <td className="number-cell">
                      {formatoCLP.format(comida.valorUnitario)}
                    </td>
                    <td className="number-cell strong-cell">
                      {formatoCLP.format(
                        comida.cantidad * comida.valorUnitario,
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="accounting-total">
                  <td>Total del mes</td>
                  <td className="number-cell">{resumen.totalRaciones}</td>
                  <td />
                  <td className="number-cell strong-cell">
                    {formatoCLP.format(resumen.montoTotal)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <aside className="pedidos-side">
          <section className="pedidos-card tracking-card">
            <h2>Seguimiento en tiempo real</h2>

            <div className="tracking-item">
              <div className="tracking-label">
                <span>Repartidos</span>
                <strong>{resumen.repartidas}</strong>
              </div>
              <div className="tracking-bar">
                <span
                  className="tracking-progress delivered-progress"
                  style={{
                    width: `${
                      resumen.totalRaciones
                        ? (resumen.repartidas / resumen.totalRaciones) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="tracking-item">
              <div className="tracking-label">
                <span>Por repartir</span>
                <strong>{resumen.porRepartir}</strong>
              </div>
              <div className="tracking-bar">
                <span
                  className="tracking-progress pending-progress"
                  style={{
                    width: `${
                      resumen.totalRaciones
                        ? (resumen.porRepartir / resumen.totalRaciones) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </section>

          <section className="pedidos-card manager-notice">
            <h2>Aviso al encargado</h2>
            <p>
              Cada turno anotado aparece en la lista de reparto al menos
              24 h antes, con el nombre y apellido del becado y la cantidad
              de comidas que le corresponde.
            </p>
          </section>
        </aside>
      </div>

      <section className="pedidos-card distribution-card">
        <div className="distribution-header">
          <h2>Lista de reparto</h2>

          <label className="status-filter">
            <span>Estado:</span>
            <select
              value={filtroEstado}
              onChange={(event) => setFiltroEstado(event.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Repartido">Repartido</option>
              <option value="Programado">Programado</option>
            </select>
          </label>
        </div>

        <div className="pedidos-table-scroll">
          <table className="pedidos-table distribution-table">
            <thead>
              <tr>
                <th>Día</th>
                <th>Becado</th>
                <th>Hospital</th>
                <th>Comidas</th>
                <th className="number-cell">Total</th>
                <th className="status-cell">Estado</th>
              </tr>
            </thead>
            <tbody>
              {pedidosFiltrados.map((pedido: PedidoReparto) => (
                <tr key={pedido.id}>
                  <td>{pedido.dia}</td>
                  <td className="strong-cell">{pedido.becado}</td>
                  <td>{pedido.hospital}</td>
                  <td>{pedido.comidas.join(' · ')}</td>
                  <td className="number-cell strong-cell">
                    {pedido.comidas.length}
                  </td>
                  <td className="status-cell">
                    <span
                      className={`pedido-status ${
                        pedido.estado === 'Repartido'
                          ? 'status-delivered'
                          : 'status-scheduled'
                      }`}
                    >
                      {pedido.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pedidosFiltrados.length === 0 && (
            <p className="pedidos-empty">
              No hay pedidos para este estado.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default AdminPedidos;
