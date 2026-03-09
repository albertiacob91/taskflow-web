import { useQuery } from '@tanstack/react-query';
import { getTasksByProject } from '../../api/tasks-api';

export function useTaskDetail(projectId: string, taskId: string) {
  return useQuery({
    queryKey: ['task', projectId, taskId],
    queryFn: async () => {
      const res = await getTasksByProject({
        projectId,
      });

      const task = res.items.find((t) => t.id === taskId);

      if (!task) {
        throw new Error('Task not found');
      }

      return task;
    },
    enabled: Boolean(projectId && taskId),
  });
}