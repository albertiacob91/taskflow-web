import { useProjectActivity } from './use-project-activity';

type ProjectActivityPanelProps = {
  projectId: string;
};

function formatActivityLabel(type: string) {
  const labels: Record<string, string> = {
    PROJECT_CREATED: 'Proyecto creado',
    PROJECT_UPDATED: 'Proyecto actualizado',
    TASK_CREATED: 'Tarea creada',
    TASK_UPDATED: 'Tarea actualizada',
    TASK_DELETED: 'Tarea eliminada',
    COMMENT_ADDED: 'Comentario añadido',
    COMMENT_UPDATED: 'Comentario actualizado',
    COMMENT_DELETED: 'Comentario eliminado',
    MEMBER_ADDED: 'Miembro añadido',
    MEMBER_REMOVED: 'Miembro eliminado',
    ATTACHMENT_UPLOADED: 'Adjunto subido',
    ATTACHMENT_DELETED: 'Adjunto eliminado',
    TASK_ASSIGNED: 'Tarea asignada',
  };

  return labels[type] || type;
}

export function ProjectActivityPanel({
  projectId,
}: ProjectActivityPanelProps) {
  const { data, isLoading, isError } = useProjectActivity(projectId);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">
        Actividad del proyecto
      </h2>

      {isLoading && <p className="text-slate-600">Cargando actividad...</p>}

      {isError && (
        <p className="text-red-600">No se pudo cargar la actividad.</p>
      )}

      {!isLoading && !isError && data?.items.length === 0 && (
        <p className="text-slate-600">No hay actividad todavía.</p>
      )}

      {!isLoading && !isError && data && data.items.length > 0 && (
        <div className="max-h-72 overflow-y-auto pr-2">
            <div className="grid gap-3">
          {[...data.items].reverse().map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <p className="font-medium text-slate-900">
                {formatActivityLabel(item.type)}
              </p>

              <p className="mt-1 text-sm text-slate-600">
                {item.actor?.name ||
                  item.actor?.email ||
                  'Usuario'}{' '}
                · {new Date(item.createdAt).toLocaleString()}
              </p>
            </article>
          ))}
            </div>
  </div>
)}
    </section>
  );
}