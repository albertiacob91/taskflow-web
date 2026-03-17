import { useDroppable } from '@dnd-kit/core';
import { TaskCardSortable } from './task-card-sortable';
import type { Task } from '../../api/tasks-api';

type KanbanColumnProps = {
  id: 'TODO' | 'IN_PROGRESS' | 'DONE';
  title: string;
  tasks: Task[];
  projectId: string;
};

export function KanbanColumn({
  id,
  title,
  tasks,
  projectId,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <section className="flex min-h-[420px] flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">
          {title}
        </h3>

        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {tasks.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={`flex flex-1 flex-col gap-3 rounded-xl p-2 transition ${
          isOver
            ? 'bg-blue-50 dark:bg-blue-950/40'
            : 'bg-transparent'
        }`}
      >
        {tasks.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-400 dark:border-slate-700 dark:text-slate-500">
            Suelta aquí una tarea
          </div>
        )}

        {tasks.map((task) => (
          <TaskCardSortable
            key={task.id}
            task={task}
            projectId={projectId}
          />
        ))}
      </div>
    </section>
  );
}