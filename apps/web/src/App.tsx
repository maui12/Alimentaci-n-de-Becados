
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './Dashboard/AdminDashboard';
import Panel from './pages/Panel/Panel.tsx';
import Calendario from './pages/Calendario/Calendario.tsx';
import Configuracion from './pages/Configuracion/Configuracion.tsx';

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<Navigate to="panel" replace />} />
        <Route path="panel" element={<Panel />} />
        <Route path="calendario" element={<Calendario />} />
        <Route path="configuracion" element={<Configuracion />} />
        {/* Becados, Pedidos, Informes: se agregan igual */}
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
export default App;