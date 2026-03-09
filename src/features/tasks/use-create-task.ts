import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../../api/tasks-api';

export function useCreateTask(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
    },
  });
}