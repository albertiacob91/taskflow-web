import { useQuery } from '@tanstack/react-query';
import { getTaskAttachments } from '../../api/attachments-api';

export function useTaskAttachments(taskId: string) {
  return useQuery({
    queryKey: ['attachments', taskId],
    queryFn: () => getTaskAttachments(taskId),
    enabled: Boolean(taskId),
  });
}