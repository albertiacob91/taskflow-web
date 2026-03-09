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
    <section
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '16px',
        marginBottom: '24px',
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: '16px' }}>Filtros</h2>

      <div
        style={{
          display: 'grid',
          gap: '12px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        }}
      >
        <div>
          <label htmlFor="search">Buscar</label>
          <input
            id="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por título o descripción"
            style={{
              display: 'block',
              width: '100%',
              padding: '8px',
              marginTop: '6px',
            }}
          />
        </div>

        <div>
          <label htmlFor="status">Estado</label>
          <select
            id="status"
            value={status}
            onChange={(e) =>
            onStatusChange(e.target.value as 'TODO' | 'IN_PROGRESS' | 'DONE' | '')
            }
            style={{
              display: 'block',
              width: '100%',
              padding: '8px',
              marginTop: '6px',
            }}
          >
            <option value="">Todos</option>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority">Prioridad</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) =>
            onPriorityChange(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH' | '')
            }
            style={{
              display: 'block',
              width: '100%',
              padding: '8px',
              marginTop: '6px',
            }}
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