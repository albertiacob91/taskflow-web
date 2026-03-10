import { http } from './http';

export type ActivityItem = {
  id: string;
  type: string;
  createdAt: string;
  actorId?: string | null;
  taskId?: string | null;
  projectId?: string | null;
  metadata?: Record<string, unknown> | null;
  actor?: {
    id: string;
    name?: string | null;
    email?: string | null;
  } | null;
};

type ActivityResponse = {
  items: ActivityItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export async function getProjectActivity(projectId: string) {
  const { data } = await http.get<ActivityResponse>(
    `/projects/${projectId}/activity?page=1&limit=50`,
  );
  return data;
}