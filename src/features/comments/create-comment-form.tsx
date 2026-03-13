import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateComment } from './use-create-comment';

type FormData = {
  content: string;
};

type CreateCommentFormProps = {
  taskId: string;
};

export function CreateCommentForm({ taskId }: CreateCommentFormProps) {
  const [serverError, setServerError] = useState('');
  const createCommentMutation = useCreateComment(taskId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      setServerError('');
      await createCommentMutation.mutateAsync({
        content: values.content,
        taskId,
      });
      reset();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'No se pudo crear el comentario';

      setServerError(
        Array.isArray(message) ? message.join(', ') : String(message),
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <textarea
        {...register('content', { required: true })}
        rows={3}
        placeholder="Escribe un comentario..."
        className="mb-3 block w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
      />

      {serverError && (
        <p className="mb-3 text-sm text-red-600 dark:text-red-400">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {isSubmitting ? 'Comentando...' : 'Añadir comentario'}
      </button>
    </form>
  );
}