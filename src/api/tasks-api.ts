import { http } from './http';

export type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: string;
  dueDate?: string | null;
};

type TasksResponse = {
  items: Task[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export async function getTasksByProject(projectId: string) {
  const { data } = await http.get<TasksResponse>(
    `/tasks?projectId=${projectId}&page=1&limit=50`,
  );
  return data;
}

type CreateTaskPayload = {
  title: string;
  description?: string;
  projectId: string;
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
};

export async function createTask(payload: CreateTaskPayload) {
  const { data } = await http.post('/tasks', payload);
  return data;
}

type UpdateTaskPayload = {
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  title?: string;
  description?: string;
  dueDate?: string;
};

export async function updateTask(taskId: string, payload: UpdateTaskPayload) {
  const { data } = await http.patch(`/tasks/${taskId}`, payload);
  return data;
}