type TasksViewToggleProps = {
  view: 'list' | 'kanban';
  onChange: (view: 'list' | 'kanban') => void;
};

export function TasksViewToggle({
  view,
  onChange,
}: TasksViewToggleProps) {
  return (
    <div className="mb-6 flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange('list')}
        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
          view === 'list'
            ? 'bg-blue-600 text-white'
            : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
        }`}
      >
        Lista
      </button>

      <button
        type="button"
        onClick={() => onChange('kanban')}
        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
          view === 'kanban'
            ? 'bg-blue-600 text-white'
            : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
        }`}
      >
        Kanban
      </button>
    </div>
  );
}