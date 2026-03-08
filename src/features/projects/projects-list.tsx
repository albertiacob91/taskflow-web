import type { Project } from '../../api/projects-api';

type ProjectsListProps = {
  projects: Project[];
};

export function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <div style={{ display: 'grid', gap: '12px' }}>
      {projects.map((project) => (
        <article
          key={project.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '16px',
          }}
        >
          <h3 style={{ margin: '0 0 8px' }}>{project.name}</h3>
          <p style={{ margin: '0 0 8px', color: '#555' }}>
            {project.description || 'Sin descripción'}
          </p>
          <small style={{ color: '#777' }}>
            Creado: {new Date(project.createdAt).toLocaleString()}
          </small>
        </article>
      ))}
    </div>
  );
}