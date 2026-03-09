import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeAccessToken } from '../utils/auth';
import { useProjects } from '../features/projects/use-projects';
import { ProjectsList } from '../features/projects/projects-list';
import { CreateProjectForm } from '../features/projects/create-project-form';

export function DashboardPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useProjects();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleLogout = () => {
    removeAccessToken();
    navigate('/login', { replace: true });
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-600">
              TaskFlow
            </p>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="mt-2 text-sm text-slate-600">
              Gestiona proyectos conectados a tu API.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowCreateForm((prev) => !prev)}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {showCreateForm ? 'Cerrar formulario' : 'Nuevo proyecto'}
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        {showCreateForm && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Crear proyecto</h2>
            <CreateProjectForm onCreated={() => setShowCreateForm(false)} />
          </section>
        )}

        {isLoading && <p className="text-slate-600">Cargando proyectos...</p>}

        {isError && (
          <p className="text-red-600">No se pudieron cargar los proyectos.</p>
        )}

        {!isLoading && !isError && data?.items.length === 0 && (
          <p className="text-slate-600">No hay proyectos todavía.</p>
        )}

        {!isLoading && !isError && data && data.items.length > 0 && (
          <ProjectsList projects={data.items} />
        )}
      </div>
    </main>
  );
}