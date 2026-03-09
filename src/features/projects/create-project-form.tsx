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
      <div style={{ marginBottom: '12px' }}>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          {...register('name')}
          style={{ display: 'block', width: '100%', padding: '8px', marginTop: '6px' }}
        />
        {errors.name && (
          <p style={{ color: 'crimson', marginTop: '6px' }}>{errors.name.message}</p>
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

      {serverError && (
        <p style={{ color: 'crimson', marginBottom: '12px' }}>{serverError}</p>
      )}

      <button type="submit" disabled={isSubmitting} style={{ padding: '10px 16px' }}>
        {isSubmitting ? 'Creando...' : 'Crear proyecto'}
      </button>
    </form>
  );
}