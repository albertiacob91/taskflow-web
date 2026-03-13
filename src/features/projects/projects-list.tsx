import { Link } from 'react-router-dom';
import type { Project } from '../../api/projects-api';

type ProjectsListProps = {
  projects: Project[];
};

export function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <Link
          key={project.id}
          to={`/projects/${project.id}`}
          className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500"
        >
          <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            {project.name}
          </h3>

          <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
            {project.description || 'Sin descripción'}
          </p>

          <small className="text-xs text-slate-500 dark:text-slate-400">
            Creado: {new Date(project.createdAt).toLocaleString()}
          </small>
        </Link>
      ))}
    </div>
  );
}