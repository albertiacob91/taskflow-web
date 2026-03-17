import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { socket } from '../../lib/socket';

export function useProjectRealtime(projectId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!projectId) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit('joinProject', { projectId });

    const invalidateComments = () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === 'task-comments',
      });
    };

    const invalidateActivity = () => {
      queryClient.invalidateQueries({ queryKey: ['project-activity', projectId] });
    };

    socket.on('commentCreated', invalidateComments);
    socket.on('commentUpdated', invalidateComments);
    socket.on('commentDeleted', invalidateComments);
    socket.on('activityUpdated', invalidateActivity);

    return () => {
      socket.emit('leaveProject', { projectId });

      socket.off('commentCreated', invalidateComments);
      socket.off('commentUpdated', invalidateComments);
      socket.off('commentDeleted', invalidateComments);
      socket.off('activityUpdated', invalidateActivity);
    };
  }, [projectId, queryClient]);
}