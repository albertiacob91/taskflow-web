import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);