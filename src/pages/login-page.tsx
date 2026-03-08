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
    <main style={{ maxWidth: 420, margin: '80px auto', padding: '24px' }}>
      <h1 style={{ marginBottom: '8px' }}>Iniciar sesión</h1>
      <p style={{ marginBottom: '24px' }}>Accede a TaskFlow Web</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '6px' }}
          />
          {errors.email && (
            <p style={{ color: 'crimson', marginTop: '6px' }}>{errors.email.message}</p>
          )}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '6px' }}
          />
          {errors.password && (
            <p style={{ color: 'crimson', marginTop: '6px' }}>{errors.password.message}</p>
          )}
        </div>

        {serverError && (
          <p style={{ color: 'crimson', marginBottom: '16px' }}>{serverError}</p>
        )}

        <button type="submit" disabled={isSubmitting} style={{ padding: '10px 16px' }}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </main>
  );
}