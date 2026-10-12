import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './AdminDashboard.css';

const opciones = [
  'Panel',
  'Calendario',
  'Becados',
  'Pedidos',
  'Informes',
  'Configuración'
];

function AdminDashboard() {
  const [paginaActual, setPaginaActual] = useState('');

  const handleSelect = (opcion: string) => { /* poner rutas reales aquí */
    setPaginaActual(opcion);
  };

  return (
    <div className="admin-dashboard">
      <Sidebar
        opciones={opciones}
        onSelect={handleSelect}
      />

      <main className="admin-dashboard-content">
        <section className="admin-page-content">
          <h1>{paginaActual}</h1>

          {/* Aquí irá el contenido de cada sección */}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
