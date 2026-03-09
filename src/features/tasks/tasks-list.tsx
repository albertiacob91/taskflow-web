import type { Task } from '../../api/tasks-api';
import { useUpdateTask } from './use-update-task';

type TasksListProps = {
  tasks: Task[];
  projectId: string;
};

export function TasksList({ tasks, projectId }: TasksListProps) {
  const updateTaskMutation = useUpdateTask(projectId);

  const handleStatusChange = async (
    taskId: string,
    status: 'TODO' | 'IN_PROGRESS' | 'DONE',
  ) => {
    await updateTaskMutation.mutateAsync({
      taskId,
      payload: { status },
    });
  };

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

          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <label>
              Estado:{' '}
              <select
                value={task.status}
                onChange={(e) =>
                  handleStatusChange(
                    task.id,
                    e.target.value as 'TODO' | 'IN_PROGRESS' | 'DONE',
                  )
                }
                disabled={updateTaskMutation.isPending}
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
            </label>

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