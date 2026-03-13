type TaskFiltersProps = {
  status: 'TODO' | 'IN_PROGRESS' | 'DONE' | '';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | '';
  search: string;
  onStatusChange: (value: 'TODO' | 'IN_PROGRESS' | 'DONE' | '') => void;
  onPriorityChange: (value: 'LOW' | 'MEDIUM' | 'HIGH' | '') => void;
  onSearchChange: (value: string) => void;
};

export function TaskFilters({
  status,
  priority,
  search,
  onStatusChange,
  onPriorityChange,
  onSearchChange,
}: TaskFiltersProps) {
  return (
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
        Filtros
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="search"
            className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Buscar
          </label>

          <input
            id="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por título o descripción"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Estado
          </label>

          <select
            id="status"
            value={status}
            onChange={(e) =>
              onStatusChange(
                e.target.value as 'TODO' | 'IN_PROGRESS' | 'DONE' | '',
              )
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">Todos</option>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="priority"
            className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Prioridad
          </label>

          <select
            id="priority"
            value={priority}
            onChange={(e) =>
              onPriorityChange(
                e.target.value as 'LOW' | 'MEDIUM' | 'HIGH' | '',
              )
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">Todas</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>
      </div>
    </section>
  );
}