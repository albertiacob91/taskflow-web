import { Link, useParams } from 'react-router-dom';
import { useProjectTasks } from '../features/tasks/use-project-tasks';
import { TasksList } from '../features/tasks/tasks-list';

export function ProjectDetailPage() {
  const { projectId = '' } = useParams();
  const { data, isLoading, isError } = useProjectTasks(projectId);

  return (
    <main style={{ maxWidth: 900, margin: '40px auto', padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          ← Volver al dashboard
        </Link>
      </div>

      <h1>Proyecto</h1>
      <p style={{ color: '#555', marginBottom: '24px' }}>
        Tareas del proyecto seleccionado
      </p>

      {isLoading && <p>Cargando tareas...</p>}

      {isError && (
        <p style={{ color: 'crimson' }}>
          No se pudieron cargar las tareas del proyecto.
        </p>
      )}

      {!isLoading && !isError && data?.items.length === 0 && (
        <p>No hay tareas todavía en este proyecto.</p>
      )}

      {!isLoading && !isError && data && data.items.length > 0 && (
        <TasksList tasks={data.items} />
      )}
    </main>
  );
}