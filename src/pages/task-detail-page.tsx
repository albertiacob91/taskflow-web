import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTaskDetail } from '../features/tasks/use-task-detail';
import { CommentsPanel } from '../features/comments/comments-panel';
import { useUpdateTask } from '../features/tasks/use-update-task';
import { useDeleteTask } from '../features/tasks/use-delete-task';
import { useProjectMembers } from '../features/projects/use-project-members';
import { AttachmentsPanel } from '../features/attachments/attachments-panel';
import { useProjectDetail } from '../features/projects/use-project-detail';

export function TaskDetailPage() {
  const navigate = useNavigate();
  const { projectId = '', taskId = '' } = useParams();
  const { data: members } = useProjectMembers(projectId);
  const { data: project } = useProjectDetail(projectId);

  const { data: task, isLoading, isError } = useTaskDetail(projectId, taskId);
  const updateTaskMutation = useUpdateTask(projectId);
  const deleteTaskMutation = useDeleteTask(projectId);

  const handleStatusChange = async (
    status: 'TODO' | 'IN_PROGRESS' | 'DONE',
  ) => {
    await updateTaskMutation.mutateAsync({
      taskId,
      payload: { status },
    });
  };

  const handleAssignUser = async (userId: string) => {
  await updateTaskMutation.mutateAsync({
    taskId,
    payload: { assignedToId: userId || null },
  });
};

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `¿Seguro que quieres borrar la tarea "${task?.title}"?`,
    );

    if (!confirmed) return;

    await deleteTaskMutation.mutateAsync(taskId);
    navigate(`/projects/${projectId}`, { replace: true });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-slate-600">Cargando tarea...</p>
        </div>
      </main>
    );
  }

  if (isError || !task) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-red-600">No se pudo cargar la tarea.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col">
            <Link
              to={`/projects/${projectId}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              ← {project?.name || 'Proyecto'}
            </Link>

            <span className="text-xs text-slate-500">
              Detalle de tarea
            </span>
          </div>

          <button
            onClick={handleDelete}
            className="rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Borrar tarea
          </button>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h1 className="text-3xl font-bold text-slate-900">
              {task.title}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Proyecto: {project?.name || '—'}
            </p>
            <p className="mt-3 text-slate-600">
              {task.description || 'Sin descripción'}
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-4 text-sm text-slate-600">
            <label className="flex items-center gap-2">
              <span className="font-medium text-slate-700">Estado:</span>
              <select
                value={task.status}
                onChange={(e) =>
                  handleStatusChange(
                    e.target.value as 'TODO' | 'IN_PROGRESS' | 'DONE',
                  )
                }
                className="rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
            </label>

            <label className="flex items-center gap-2">
              <span className="font-medium text-slate-700">Asignado a:</span>

              <select
                value={task.assignedToId || ''}
                onChange={(e) => handleAssignUser(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="">Sin asignar</option>

                {members?.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name || member.email}
                  </option>
                ))}
              </select>
            </label>

            <p>
              <span className="font-medium text-slate-700">Prioridad:</span>{' '}
              {task.priority}
            </p>

            {task.dueDate && (
              <p>
                <span className="font-medium text-slate-700">Fecha límite:</span>{' '}
                {new Date(task.dueDate).toLocaleString()}
              </p>
            )}
          </div>

          <CommentsPanel taskId={task.id} />
          <AttachmentsPanel taskId={task.id} />
        </section>
      </div>
    </main>
  );
}