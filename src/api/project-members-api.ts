import { http } from './http';

export type ProjectMember = {
  id: string;
  email: string;
  name?: string | null;
};

type ProjectMembersResponse = {
  owner: ProjectMember;
  members: ProjectMember[];
};

export async function getProjectMembers(projectId: string) {
  const { data } = await http.get<ProjectMembersResponse>(
    `/projects/${projectId}/members`,
  );
  return [data.owner, ...data.members];
}