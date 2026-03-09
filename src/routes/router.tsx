import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { ProjectDetailPage } from '../pages/project-detail-page';
import { ProtectedRoute } from './protected-route';
import { TaskDetailPage } from '../pages/task-detail-page';

export const router = createBrowserRouter([
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
]);