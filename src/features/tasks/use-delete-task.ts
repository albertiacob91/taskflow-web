import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../../api/tasks-api';

export function useDeleteTask(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
    },
  });
}