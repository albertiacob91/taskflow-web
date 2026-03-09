import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../../api/comments-api';

export function useDeleteComment(taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
    },
  });
}