import { useState } from 'react';
import { useTaskAttachments } from './use-task-attachments';
import { useUploadAttachment } from './use-upload-attachment';
import { useDeleteAttachment } from './use-delete-attachment';

type AttachmentsPanelProps = {
  taskId: string;
};

export function AttachmentsPanel({ taskId }: AttachmentsPanelProps) {
  const { data: attachments, isLoading, isError } = useTaskAttachments(taskId);
  const uploadMutation = useUploadAttachment(taskId);
  const deleteMutation = useDeleteAttachment(taskId);

  const [serverError, setServerError] = useState('');

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setServerError('');
      await uploadMutation.mutateAsync({ taskId, file });
      e.target.value = '';
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'No se pudo subir el archivo';

      setServerError(
        Array.isArray(message) ? message.join(', ') : String(message),
      );
    }
  };

  const handleDelete = async (
    attachmentId: string,
    fileName: string,
  ) => {
    const confirmed = window.confirm(
      `¿Seguro que quieres borrar el archivo "${fileName}"?`,
    );

    if (!confirmed) return;

    await deleteMutation.mutateAsync(attachmentId);
  };

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
        Adjuntos
      </h2>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Subir archivo
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          disabled={uploadMutation.isPending}
          className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700 dark:text-slate-300 dark:file:bg-blue-600 dark:file:text-white dark:hover:file:bg-blue-500"
        />
      </div>

      {serverError && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {serverError}
        </div>
      )}

      {isLoading && (
        <p className="text-slate-600 dark:text-slate-400">
          Cargando adjuntos...
        </p>
      )}

      {isError && (
        <p className="text-red-600 dark:text-red-400">
          No se pudieron cargar los adjuntos.
        </p>
      )}

      {!isLoading && !isError && attachments?.length === 0 && (
        <p className="text-slate-600 dark:text-slate-400">
          No hay archivos adjuntos todavía.
        </p>
      )}

      {!isLoading && !isError && attachments && attachments.length > 0 && (
        <div className="grid gap-3">
          {attachments.map((attachment) => (
            <article
              key={attachment.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            >
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  {attachment.originalName}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {attachment.mimeType} · {(attachment.size / 1024).toFixed(1)} KB
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleDelete(attachment.id, attachment.originalName)
                }
                disabled={deleteMutation.isPending}
                className="rounded-xl border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60 dark:border-red-900 dark:bg-slate-900 dark:text-red-400 dark:hover:bg-red-950"
              >
                Eliminar
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}