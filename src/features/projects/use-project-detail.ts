import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../../api/projects-api';

export function useProjectDetail(projectId: string) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const data = await getProjects();
      const project = data.items.find((item) => item.id === projectId);

      if (!project) {
        throw new Error('Project not found');
      }

      return project;
    },
    enabled: Boolean(projectId),
  });
}