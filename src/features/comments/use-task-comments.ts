import { useQuery } from '@tanstack/react-query';
import { getCommentsByTask } from '../../api/comments-api';

export function useTaskComments(taskId: string) {
  return useQuery({
    queryKey: ['comments', taskId],
    queryFn: () => getCommentsByTask(taskId),
    enabled: Boolean(taskId),
  });
}