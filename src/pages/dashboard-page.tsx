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
    <main style={{ maxWidth: 900, margin: '40px auto', padding: '24px' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>TaskFlow Dashboard</h1>
          <p style={{ marginTop: '8px', color: '#555' }}>
            Lista de proyectos conectada a la API
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setShowCreateForm((prev) => !prev)}
            style={{ padding: '10px 16px' }}
          >
            {showCreateForm ? 'Cerrar formulario' : 'Nuevo proyecto'}
          </button>

          <button onClick={handleLogout} style={{ padding: '10px 16px' }}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {showCreateForm && (
        <section
          style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '16px',
            marginBottom: '24px',
          }}
        >
          <h2 style={{ marginTop: 0 }}>Crear proyecto</h2>
          <CreateProjectForm onCreated={() => setShowCreateForm(false)} />
        </section>
      )}

      {isLoading && <p>Cargando proyectos...</p>}

      {isError && (
        <p style={{ color: 'crimson' }}>
          No se pudieron cargar los proyectos.
        </p>
      )}

      {!isLoading && !isError && data?.items.length === 0 && (
        <p>No hay proyectos todavía.</p>
      )}

      {!isLoading && !isError && data && data.items.length > 0 && (
        <ProjectsList projects={data.items} />
      )}
    </main>
  );
}