import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Outlet />
    </div>
  );
}