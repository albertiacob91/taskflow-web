import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeProjectMember } from '../../api/project-members-api';

type RemoveProjectMemberInput = {
  projectId: string;
  memberId: string;
};

export function useRemoveProjectMember(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, memberId }: RemoveProjectMemberInput) =>
      removeProjectMember(projectId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-members', projectId] });
    },
  });
}