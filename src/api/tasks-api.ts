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