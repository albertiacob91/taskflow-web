import { useNavigate } from 'react-router-dom';
import { removeAccessToken } from '../utils/auth';

export function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAccessToken();
    navigate('/login', { replace: true });
  };

  return (
    <main style={{ maxWidth: 900, margin: '40px auto', padding: '24px' }}>
      <h1>Dashboard</h1>
      <p>Bienvenido a TaskFlow Web.</p>

      <button onClick={handleLogout} style={{ marginTop: '16px', padding: '10px 16px' }}>
        Cerrar sesión
      </button>
    </main>
  );
}