import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProjectTasks } from '../features/tasks/use-project-tasks';
import { TasksList } from '../features/tasks/tasks-list';
import { CreateTaskForm } from '../features/tasks/create-task-form';
import { TaskFilters } from '../features/tasks/task-filters';
import { ProjectMembersPanel } from '../features/projects/project-members-panel';
import { ProjectActivityPanel } from '../features/activity/project-activity-panel';
import { useProjectDetail } from '../features/projects/use-project-detail';

export function ProjectDetailPage() {
  const { projectId = '' } = useParams();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { data: project } = useProjectDetail(projectId);

  const [status, setStatus] = useState<'TODO' | 'IN_PROGRESS' | 'DONE' | ''>('');
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH' | ''>('');
  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useProjectTasks({
    projectId,
    status: status || undefined,
    priority: priority || undefined,
    search: search || undefined,
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Volver al dashboard
          </Link>

          <button
            onClick={() => setShowCreateForm((prev) => !prev)}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {showCreateForm ? 'Cerrar formulario' : 'Nueva tarea'}
          </button>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            {project?.name || 'Proyecto'}
          </h1>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {project?.description || 'Tareas del proyecto seleccionado'}
          </p>
        </div>

        {showCreateForm && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
              Crear tarea
            </h2>

            <CreateTaskForm
              projectId={projectId}
              onCreated={() => setShowCreateForm(false)}
            />
          </section>
        )}

        <TaskFilters
          status={status}
          priority={priority}
          search={search}
          onStatusChange={setStatus}
          onPriorityChange={setPriority}
          onSearchChange={setSearch}
        />

        {isLoading && (
          <p className="text-slate-600 dark:text-slate-400">
            Cargando tareas...
          </p>
        )}

        {isError && (
          <p className="text-red-600 dark:text-red-400">
            No se pudieron cargar las tareas del proyecto.
          </p>
        )}

        {!isLoading && !isError && data?.items.length === 0 && (
          <p className="text-slate-600 dark:text-slate-400">
            No hay tareas para los filtros seleccionados.
          </p>
        )}

        {!isLoading && !isError && data && data.items.length > 0 && (
          <div className="mb-8">
            <TasksList tasks={data.items} projectId={projectId} />
          </div>
        )}

        <div className="mb-6">
          <ProjectMembersPanel projectId={projectId} />
        </div>

        <div className="mb-6">
          <ProjectActivityPanel projectId={projectId} />
        </div>
      </div>
    </main>
  );
}