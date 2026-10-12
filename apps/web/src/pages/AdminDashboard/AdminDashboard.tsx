
import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import AdminBecados from '../AdminBecados/AdminBecados';
import AdminPedidos from '../AdminPedidos/AdminPedidos';
import './AdminDashboard.css';

const opciones = [
  'Panel',
  'Calendario',
  'Becados',
  'Pedidos',
  'Informes',
  'Configuración',
];

function AdminDashboard() {
  const [paginaActual, setPaginaActual] = useState('Panel');

  const handleSelect = (opcion: string) => {
    setPaginaActual(opcion);
  };

  const renderizarPagina = () => {
    switch (paginaActual) {
      case 'Panel':
        return (
          <section className="admin-page-content">
            <h1>Panel</h1>
            <p>Resumen general de la administración.</p>
          </section>
        );

      case 'Becados':
        return <AdminBecados />;

      case 'Pedidos':
        return <AdminPedidos />;

      case 'Calendario':
      case 'Informes':
      case 'Configuración':
        return (
          <section className="admin-page-content">
            <h1>{paginaActual}</h1>
            <p>Esta sección estará disponible próximamente.</p>
          </section>
        );

      default:
        return <h1>Página no encontrada</h1>;
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar
        opciones={opciones}
        onSelect={handleSelect}
      />

      <main className="admin-dashboard-content">
        {renderizarPagina()}
      </main>
    </div>
  );
}

export default AdminDashboard;
