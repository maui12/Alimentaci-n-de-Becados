import { useState } from 'react';
import './Sidebar.css';

interface SidebarProps {
  opciones?: string[];
  onSelect?: (opcion: string) => void;
}

function Sidebar({ opciones = [], onSelect }: SidebarProps) {
  const [abierta, setAbierta] = useState(true);

  return (
    <div className="sidebar-container">
      <aside
        className={`sidebar ${
          abierta ? 'sidebar-abierta' : 'sidebar-cerrada'
        }`}
      >
        <div className="sidebar-header">
          <div className="sidebar-logos">
            <div className="logo">
                <img
                    className="sidebar-logo"
                    src="/src/assets/logoUCN.png"
                    alt="Universidad Católica del Norte"
                />
            </div>
            <div className="logo">
                <img
                    className="sidebar-logo"
                    src="/src/assets/logoFAMED.png"
                    alt="Facultad de Medicina UCN"
                />
            </div>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Menú principal">
          {opciones.map((opcion) => (
            <button
              key={opcion}
              className="sidebar-option"
              onClick={() => onSelect?.(opcion)}
            >
              {opcion}
            </button>
          ))}
        </nav>
      </aside>

      <button
        className="sidebar-toggle"
        onClick={() => setAbierta(!abierta)}
        aria-label={abierta ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={abierta}
      >
        {abierta ? '✕' : '☰'}
      </button>
    </div>
  );
}

export default Sidebar;
