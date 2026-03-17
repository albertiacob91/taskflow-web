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
          query.queryKey[0] === 'comments',
      });
    };

    const invalidateActivity = () => {
      queryClient.invalidateQueries({
        queryKey: ['project-activity', projectId],
      });
    };

    const invalidateTasks = () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === 'tasks' &&
          query.queryKey[1] === projectId,
      });
    };

    const invalidateProject = () => {
      queryClient.invalidateQueries({
        queryKey: ['project', projectId],
      });
    };

    const invalidateMembers = () => {
      queryClient.invalidateQueries({
        queryKey: ['project-members', projectId],
      });
    };

    const invalidateAttachments = () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === 'attachments',
      });
    };

    socket.on('commentCreated', invalidateComments);
    socket.on('commentUpdated', invalidateComments);
    socket.on('commentDeleted', invalidateComments);

    socket.on('activityUpdated', invalidateActivity);

    socket.on('taskCreated', invalidateTasks);
    socket.on('taskUpdated', invalidateTasks);
    socket.on('taskDeleted', invalidateTasks);

    socket.on('projectUpdated', invalidateProject);
    socket.on('projectDeleted', invalidateProject);

    socket.on('memberAdded', invalidateMembers);
    socket.on('memberRemoved', invalidateMembers);

    socket.on('attachmentUploaded', invalidateAttachments);
    socket.on('attachmentDeleted', invalidateAttachments);

    return () => {
      socket.emit('leaveProject', { projectId });

      socket.off('commentCreated', invalidateComments);
      socket.off('commentUpdated', invalidateComments);
      socket.off('commentDeleted', invalidateComments);

      socket.off('activityUpdated', invalidateActivity);

      socket.off('taskCreated', invalidateTasks);
      socket.off('taskUpdated', invalidateTasks);
      socket.off('taskDeleted', invalidateTasks);

      socket.off('projectUpdated', invalidateProject);
      socket.off('projectDeleted', invalidateProject);

      socket.off('memberAdded', invalidateMembers);
      socket.off('memberRemoved', invalidateMembers);

      socket.off('attachmentUploaded', invalidateAttachments);
      socket.off('attachmentDeleted', invalidateAttachments);
    };
  }, [projectId, queryClient]);
}