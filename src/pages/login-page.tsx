import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginRequest } from '../api/auth-api';
import { setAccessToken } from '../utils/auth';

const loginSchema = z.object({
  email: z.email('Introduce un email válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormData) => {
    try {
      setServerError('');
      const data = await loginRequest(values);
      setAccessToken(data.accessToken);
      navigate('/', { replace: true });
    } catch {
      setServerError('Credenciales incorrectas o error del servidor');
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
            TaskFlow Web
          </p>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Iniciar sesión
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Accede a tu espacio de proyectos y tareas.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {serverError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
              {serverError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  );
}