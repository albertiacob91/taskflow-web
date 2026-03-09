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
    <main style={{ maxWidth: 900, margin: '40px auto', padding: '24px' }}>
      <div
        style={{
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          ← Volver al dashboard
        </Link>

        <button
          onClick={() => setShowCreateForm((prev) => !prev)}
          style={{ padding: '10px 16px' }}
        >
          {showCreateForm ? 'Cerrar formulario' : 'Nueva tarea'}
        </button>
      </div>

      <h1>Proyecto</h1>
      <p style={{ color: '#555', marginBottom: '24px' }}>
        Tareas del proyecto seleccionado
      </p>

      <TaskFilters
        status={status}
        priority={priority}
        search={search}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
        onSearchChange={setSearch}
      />

      {showCreateForm && (
        <section
          style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '16px',
            marginBottom: '24px',
          }}
        >
          <h2 style={{ marginTop: 0 }}>Crear tarea</h2>
          <CreateTaskForm
            projectId={projectId}
            onCreated={() => setShowCreateForm(false)}
          />
        </section>
      )}

      {isLoading && <p>Cargando tareas...</p>}

      {isError && (
        <p style={{ color: 'crimson' }}>
          No se pudieron cargar las tareas del proyecto.
        </p>
      )}

      {!isLoading && !isError && data?.items.length === 0 && (
        <p>No hay tareas para los filtros seleccionados.</p>
      )}

      {!isLoading && !isError && data && data.items.length > 0 && (
        <TasksList tasks={data.items} projectId={projectId} />
      )}
    </main>
  );
}