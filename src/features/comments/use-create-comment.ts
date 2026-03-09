import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from '../../api/comments-api';

export function useCreateComment(taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
    },
  });
}