import { useQuery } from '@tanstack/react-query';
import { getProjectActivity } from '../../api/activity-api';

export function useProjectActivity(projectId: string) {
  return useQuery({
    queryKey: ['project-activity', projectId],
    queryFn: () => getProjectActivity(projectId),
    enabled: Boolean(projectId),
  });
}