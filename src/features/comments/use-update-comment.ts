import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateComment } from '../../api/comments-api';

type UpdateCommentInput = {
  commentId: string;
  content: string;
  taskId: string;
};

export function useUpdateComment(taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: UpdateCommentInput) =>
      updateComment(commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
    },
  });
}