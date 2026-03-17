import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { Link } from 'react-router-dom';
import type { Task } from '../../api/tasks-api';
import { StatusBadge, PriorityBadge } from '../../components/task-badges';

type TaskCardSortableProps = {
  task: Task;
  projectId: string;
};

export function TaskCardSortable({
  task,
  projectId,
}: TaskCardSortableProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      task,
      status: task.status,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 ${
        isDragging ? 'opacity-60 ring-2 ring-blue-400' : ''
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Link
            to={`/projects/${projectId}/tasks/${task.id}`}
            className="block text-sm font-semibold text-slate-900 hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400"
          >
            {task.title}
          </Link>

          <div className="mt-2 flex flex-wrap gap-2">
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
          </div>
        </div>

        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs text-slate-500 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          ⠿
        </button>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400">
        {task.description || 'Sin descripción'}
      </p>

      {task.dueDate && (
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          Vence: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
    </article>
  );
}