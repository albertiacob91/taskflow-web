import { useQuery } from '@tanstack/react-query';
import { getTasksByProject } from '../../api/tasks-api';

export function useProjectTasks(projectId: string) {
  return useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => getTasksByProject(projectId),
    enabled: Boolean(projectId),
  });
}