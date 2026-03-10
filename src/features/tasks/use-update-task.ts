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
    assignedToId?: string | null;
  };
};

export function useUpdateTask(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, payload }: UpdateTaskInput) =>
      updateTask(taskId, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
      queryClient.invalidateQueries({
        queryKey: ['task', projectId, variables.taskId],
      });
    },
  });
}