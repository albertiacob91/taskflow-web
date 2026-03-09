import { useQuery } from '@tanstack/react-query';
import { getTasksByProject } from '../../api/tasks-api';

type UseProjectTasksParams = {
  projectId: string;
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  search?: string;
};

export function useProjectTasks(params: UseProjectTasksParams) {
  return useQuery({
    queryKey: ['tasks', params.projectId, params.status, params.priority, params.search],
    queryFn: () => getTasksByProject(params),
    enabled: Boolean(params.projectId),
  });
}