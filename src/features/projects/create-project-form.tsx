import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateProject } from './use-create-project';

const schema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type CreateProjectFormProps = {
  onCreated?: () => void;
};

export function CreateProjectForm({ onCreated }: CreateProjectFormProps) {
  const [serverError, setServerError] = useState('');
  const createProjectMutation = useCreateProject();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      setServerError('');
      await createProjectMutation.mutateAsync(values);
      reset();
      onCreated?.();
    } catch {
      setServerError('No se pudo crear el proyecto');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-3">
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Nombre
        </label>
        <input
          id="name"
          {...register('name')}
          className="block w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.name.message}
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
        {isSubmitting ? 'Creando...' : 'Crear proyecto'}
      </button>
    </form>
  );
}