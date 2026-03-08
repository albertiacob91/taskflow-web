import { http } from './http';

export type Project = {
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
};

type ProjectsResponse = {
  items: Project[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export async function getProjects() {
  const { data } = await http.get<ProjectsResponse>('/projects?page=1&limit=20');
  return data;
}