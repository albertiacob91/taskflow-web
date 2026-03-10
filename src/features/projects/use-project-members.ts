import { useQuery } from '@tanstack/react-query';
import { getProjectMembers } from '../../api/project-members-api';

export function useProjectMembers(projectId: string) {
  return useQuery({
    queryKey: ['project-members', projectId],
    queryFn: () => getProjectMembers(projectId),
    enabled: Boolean(projectId),
  });
}