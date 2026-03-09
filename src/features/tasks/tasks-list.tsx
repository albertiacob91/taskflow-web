import type { Task } from '../../api/tasks-api';
import { useUpdateTask } from './use-update-task';
import { useDeleteTask } from './use-delete-task';
import { CommentsPanel } from '../comments/comments-panel';

type TasksListProps = {
  tasks: Task[];
  projectId: string;
};

export function TasksList({ tasks, projectId }: TasksListProps) {
  const updateTaskMutation = useUpdateTask(projectId);
  const deleteTaskMutation = useDeleteTask(projectId);

  const handleStatusChange = async (
    taskId: string,
    status: 'TODO' | 'IN_PROGRESS' | 'DONE',
  ) => {
    await updateTaskMutation.mutateAsync({
      taskId,
      payload: { status },
    });
  };

  const handleDeleteTask = async (taskId: string, title: string) => {
    const confirmed = window.confirm(
      `¿Seguro que quieres borrar la tarea "${title}"?`,
    );

    if (!confirmed) return;

    await deleteTaskMutation.mutateAsync(taskId);
  };

  const isBusy = updateTaskMutation.isPending || deleteTaskMutation.isPending;

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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '12px',
              alignItems: 'start',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 8px' }}>{task.title}</h3>

              <p style={{ margin: '0 0 8px', color: '#555' }}>
                {task.description || 'Sin descripción'}
              </p>
            </div>

            <button
              onClick={() => handleDeleteTask(task.id, task.title)}
              disabled={isBusy}
              style={{ padding: '8px 12px' }}
            >
              Borrar
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              alignItems: 'center',
              marginTop: '8px',
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
                disabled={isBusy}
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
          <CommentsPanel taskId={task.id} />
        </article>
      ))}
    </div>
  );
}