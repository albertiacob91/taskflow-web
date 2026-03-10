import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadTaskAttachment } from '../../api/attachments-api';

type UploadAttachmentInput = {
  taskId: string;
  file: File;
};

export function useUploadAttachment(taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, file }: UploadAttachmentInput) =>
      uploadTaskAttachment(taskId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attachments', taskId] });
    },
  });
}