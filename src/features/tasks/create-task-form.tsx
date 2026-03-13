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
      <div className="mb-3">
        <label
          htmlFor="title"
          className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Título
        </label>
        <input
          id="title"
          {...register('title')}
          className="block w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="mb-3">
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Descripción
        </label>
        <textarea
          id="description"
          {...register('description')}
          rows={4}
          className="block w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="status"
          className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Estado
        </label>
        <select
          id="status"
          {...register('status')}
          className="block w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
      </div>

      <div className="mb-3">
        <label
          htmlFor="priority"
          className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Prioridad
        </label>
        <select
          id="priority"
          {...register('priority')}
          className="block w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
      </div>

      <div className="mb-3">
        <label
          htmlFor="dueDate"
          className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Fecha límite
        </label>
        <input
          id="dueDate"
          type="datetime-local"
          {...register('dueDate')}
          className="block w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      {serverError && (
        <p className="mb-3 text-sm text-red-600 dark:text-red-400">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {isSubmitting ? 'Creando...' : 'Crear tarea'}
      </button>
    </form>
  );
}