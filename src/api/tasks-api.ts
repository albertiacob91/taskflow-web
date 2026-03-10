import { http } from './http';

export type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: string;
  dueDate?: string | null;
  assignedToId?: string | null;
};

type TasksResponse = {
  items: Task[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type GetTasksByProjectParams = {
  projectId: string;
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  search?: string;
};

export async function getTasksByProject(params: GetTasksByProjectParams) {
  const searchParams = new URLSearchParams();

  searchParams.set('projectId', params.projectId);
  searchParams.set('page', '1');
  searchParams.set('limit', '50');

  if (params.status) {
    searchParams.set('status', params.status);
  }

  if (params.priority) {
    searchParams.set('priority', params.priority);
  }

  if (params.search) {
    searchParams.set('search', params.search);
  }

  const { data } = await http.get<TasksResponse>(`/tasks?${searchParams.toString()}`);
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
  assignedToId?: string | null;
};

export async function updateTask(taskId: string, payload: UpdateTaskPayload) {
  const { data } = await http.patch(`/tasks/${taskId}`, payload);
  return data;
}

export async function deleteTask(taskId: string) {
  const { data } = await http.delete(`/tasks/${taskId}`);
  return data;
}