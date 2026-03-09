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
        style={{
          display: 'block',
          width: '100%',
          padding: '8px',
          marginBottom: '12px',
        }}
      />

      {serverError && (
        <p style={{ color: 'crimson', marginBottom: '12px' }}>{serverError}</p>
      )}

      <button type="submit" disabled={isSubmitting} style={{ padding: '8px 12px' }}>
        {isSubmitting ? 'Comentando...' : 'Añadir comentario'}
      </button>
    </form>
  );
}