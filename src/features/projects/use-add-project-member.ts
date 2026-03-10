import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProjectMember } from '../../api/project-members-api';

type AddProjectMemberInput = {
  projectId: string;
  email: string;
  role?: 'MEMBER' | 'VIEWER';
};

export function useAddProjectMember(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, email, role }: AddProjectMemberInput) =>
      addProjectMember(projectId, { email, role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-members', projectId] });
    },
  });
}