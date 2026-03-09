import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateTask } from './use-create-task';

const schema = z.object({
  title: z.string().min(2, 'El título debe tener al menos 2 caracteres'),
  description: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  dueDate: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type CreateTaskFormProps = {
  projectId: string;
  onCreated?: () => void;
};

export function CreateTaskForm({
  projectId,
  onCreated,
}: CreateTaskFormProps) {
  const [serverError, setServerError] = useState('');
  const createTaskMutation = useCreateTask(projectId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      status: 'TODO',
      priority: 'MEDIUM',
      dueDate: '',
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      setServerError('');

            await createTaskMutation.mutateAsync({
        title: values.title,
        description: values.description,
        status: values.status,
        priority: values.priority,
        dueDate: values.dueDate
          ? new Date(values.dueDate).toISOString()
          : undefined,
        projectId,
      });

      reset();
      onCreated?.();
        } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'No se pudo crear la tarea';

      setServerError(
        Array.isArray(message) ? message.join(', ') : String(message),
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div style={{ marginBottom: '12px' }}>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          {...register('title')}
          style={{ display: 'block', width: '100%', padding: '8px', marginTop: '6px' }}
        />
        {errors.title && (
          <p style={{ color: 'crimson', marginTop: '6px' }}>{errors.title.message}</p>
        )}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          {...register('description')}
          rows={4}
          style={{ display: 'block', width: '100%', padding: '8px', marginTop: '6px' }}
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label htmlFor="status">Estado</label>
        <select
          id="status"
          {...register('status')}
          style={{ display: 'block', width: '100%', padding: '8px', marginTop: '6px' }}
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label htmlFor="priority">Prioridad</label>
        <select
          id="priority"
          {...register('priority')}
          style={{ display: 'block', width: '100%', padding: '8px', marginTop: '6px' }}
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label htmlFor="dueDate">Fecha límite</label>
        <input
          id="dueDate"
          type="datetime-local"
          {...register('dueDate')}
          style={{ display: 'block', width: '100%', padding: '8px', marginTop: '6px' }}
        />
      </div>

      {serverError && (
        <p style={{ color: 'crimson', marginBottom: '12px' }}>{serverError}</p>
      )}

      <button type="submit" disabled={isSubmitting} style={{ padding: '10px 16px' }}>
        {isSubmitting ? 'Creando...' : 'Crear tarea'}
      </button>
    </form>
  );
}