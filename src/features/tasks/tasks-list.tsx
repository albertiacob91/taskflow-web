import { Link } from 'react-router-dom';
import type { Task } from '../../api/tasks-api';
import { useUpdateTask } from './use-update-task';
import { useDeleteTask } from './use-delete-task';
import { StatusBadge, PriorityBadge } from '../../components/task-badges';

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
    <div className="grid gap-4">
      {tasks.map((task) => (
        <article
          key={task.id}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <Link
                to={`/projects/${projectId}/tasks/${task.id}`}
                className="block text-lg font-semibold text-slate-900 transition hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400"
              >
                {task.title}
              </Link>

              <div className="mt-2 flex flex-wrap gap-2">
                <StatusBadge status={task.status} />
                <PriorityBadge priority={task.priority} />
              </div>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                {task.description || 'Sin descripción'}
              </p>
            </div>

            <button
              onClick={() => handleDeleteTask(task.id, task.title)}
              disabled={isBusy}
              className="rounded-xl border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60 dark:border-red-900 dark:bg-slate-900 dark:text-red-400 dark:hover:bg-red-950"
            >
              Borrar
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <label className="flex items-center gap-2">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Estado:
              </span>
              <select
                value={task.status}
                onChange={(e) =>
                  handleStatusChange(
                    task.id,
                    e.target.value as 'TODO' | 'IN_PROGRESS' | 'DONE',
                  )
                }
                disabled={isBusy}
                className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
            </label>

            {task.dueDate && (
              <small className="text-slate-500 dark:text-slate-400">
                Vence: {new Date(task.dueDate).toLocaleDateString()}
              </small>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}