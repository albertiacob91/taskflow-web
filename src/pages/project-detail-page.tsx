import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProjectTasks } from '../features/tasks/use-project-tasks';
import { TasksList } from '../features/tasks/tasks-list';
import { CreateTaskForm } from '../features/tasks/create-task-form';
import { TaskFilters } from '../features/tasks/task-filters';

export function ProjectDetailPage() {
  const { projectId = '' } = useParams();
  const [showCreateForm, setShowCreateForm] = useState(false);

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
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
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
          <h1 className="text-3xl font-bold text-slate-900">Proyecto</h1>
          <p className="mt-2 text-sm text-slate-600">
            Tareas del proyecto seleccionado
          </p>
        </div>

        <TaskFilters
          status={status}
          priority={priority}
          search={search}
          onStatusChange={setStatus}
          onPriorityChange={setPriority}
          onSearchChange={setSearch}
        />

        {showCreateForm && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Crear tarea</h2>
            <CreateTaskForm
              projectId={projectId}
              onCreated={() => setShowCreateForm(false)}
            />
          </section>
        )}

        {isLoading && <p className="text-slate-600">Cargando tareas...</p>}

        {isError && (
          <p className="text-red-600">
            No se pudieron cargar las tareas del proyecto.
          </p>
        )}

        {!isLoading && !isError && data?.items.length === 0 && (
          <p className="text-slate-600">No hay tareas para los filtros seleccionados.</p>
        )}

        {!isLoading && !isError && data && data.items.length > 0 && (
          <TasksList tasks={data.items} projectId={projectId} />
        )}
      </div>
    </main>
  );
}