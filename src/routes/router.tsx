import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { ProjectDetailPage } from '../pages/project-detail-page';
import { TaskDetailPage } from '../pages/task-detail-page';
import { ProtectedRoute } from './protected-route';
import { AppLayout } from '../layouts/app-layout';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/projects/:projectId',
        element: (
          <ProtectedRoute>
            <ProjectDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/projects/:projectId/tasks/:taskId',
        element: (
          <ProtectedRoute>
            <TaskDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);