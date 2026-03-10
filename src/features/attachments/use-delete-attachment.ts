import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAttachment } from '../../api/attachments-api';

export function useDeleteAttachment(taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAttachment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attachments', taskId] });
    },
  });
}