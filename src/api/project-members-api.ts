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

type AddProjectMemberPayload = {
  email: string;
  role?: 'MEMBER' | 'VIEWER';
};

export async function addProjectMember(
  projectId: string,
  payload: AddProjectMemberPayload,
) {
  const { data } = await http.post(`/projects/${projectId}/members`, payload);
  return data;
}

export async function removeProjectMember(
  projectId: string,
  memberId: string,
) {
  const { data } = await http.delete(`/projects/${projectId}/members/${memberId}`);
  return data;
}