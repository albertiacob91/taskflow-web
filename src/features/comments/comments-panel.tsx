import { useState } from 'react';
import { useTaskComments } from './use-task-comments';
import { CreateCommentForm } from './create-comment-form';
import { useUpdateComment } from './use-update-comment';
import { useDeleteComment } from './use-delete-comment';

type CommentsPanelProps = {
  taskId: string;
};

export function CommentsPanel({ taskId }: CommentsPanelProps) {
  const { data, isLoading, isError } = useTaskComments(taskId);
  const updateCommentMutation = useUpdateComment(taskId);
  const deleteCommentMutation = useDeleteComment(taskId);

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');

  const isBusy =
    updateCommentMutation.isPending || deleteCommentMutation.isPending;

  const startEditing = (commentId: string, content: string) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const saveEditing = async () => {
    if (!editingCommentId) return;

    await updateCommentMutation.mutateAsync({
      commentId: editingCommentId,
      content: editingContent,
      taskId,
    });

    cancelEditing();
  };

  const handleDelete = async (commentId: string) => {
    const confirmed = window.confirm(
      '¿Seguro que quieres borrar este comentario?',
    );

    if (!confirmed) return;

    await deleteCommentMutation.mutateAsync(commentId);
  };

  return (
    <section className="mt-4 border-t border-slate-200 pt-4">
      <h4 className="mb-3 text-sm font-semibold text-slate-800">Comentarios</h4>

      <CreateCommentForm taskId={taskId} />

      {isLoading && <p className="text-sm text-slate-500">Cargando comentarios...</p>}

      {isError && (
        <p className="text-sm text-red-600">
          No se pudieron cargar los comentarios.
        </p>
      )}

      {!isLoading && !isError && data?.items.length === 0 && (
        <p className="text-sm text-slate-500">No hay comentarios todavía.</p>
      )}

      {!isLoading && !isError && data && data.items.length > 0 && (
        <div className="mt-4 grid gap-3">
          {data.items.map((comment) => {
            const isEditing = editingCommentId === comment.id;

            return (
              <article
                key={comment.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3"
              >
                {isEditing ? (
                  <div className="space-y-3">
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={saveEditing}
                        disabled={isBusy}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                      >
                        Guardar
                      </button>

                      <button
                        onClick={cancelEditing}
                        disabled={isBusy}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="mb-2 text-sm text-slate-800">{comment.content}</p>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <small className="text-xs text-slate-500">
                        {comment.author?.name || comment.author?.email || 'Usuario'} ·{' '}
                        {new Date(comment.createdAt).toLocaleString()}
                      </small>

                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditing(comment.id, comment.content)}
                          disabled={isBusy}
                          className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-60"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => handleDelete(comment.id)}
                          disabled={isBusy}
                          className="rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
                        >
                          Borrar
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}