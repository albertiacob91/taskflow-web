import type { Task } from '../../api/tasks-api';

type TasksListProps = {
  tasks: Task[];
};

export function TasksList({ tasks }: TasksListProps) {
  return (
    <div style={{ display: 'grid', gap: '12px' }}>
      {tasks.map((task) => (
        <article
          key={task.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '16px',
          }}
        >
          <h3 style={{ margin: '0 0 8px' }}>{task.title}</h3>

          <p style={{ margin: '0 0 8px', color: '#555' }}>
            {task.description || 'Sin descripción'}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <small>Estado: {task.status}</small>
            <small>Prioridad: {task.priority}</small>
            {task.dueDate && (
              <small>
                Vence: {new Date(task.dueDate).toLocaleDateString()}
              </small>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}