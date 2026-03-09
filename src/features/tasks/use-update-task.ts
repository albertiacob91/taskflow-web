import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../../api/tasks-api';

type UpdateTaskInput = {
  taskId: string;
  payload: {
    status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
    priority?: 'LOW' | 'MEDIUM' | 'HIGH';
    title?: string;
    description?: string;
    dueDate?: string;
  };
};

export function useUpdateTask(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, payload }: UpdateTaskInput) =>
      updateTask(taskId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
    },
  });
}