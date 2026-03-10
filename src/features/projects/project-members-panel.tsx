import { useState } from 'react';
import { useProjectMembers } from './use-project-members';
import { useAddProjectMember } from './use-add-project-member';

type ProjectMembersPanelProps = {
  projectId: string;
};

export function ProjectMembersPanel({ projectId }: ProjectMembersPanelProps) {
  const { data: members, isLoading, isError } = useProjectMembers(projectId);
  const addMemberMutation = useAddProjectMember(projectId);

  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'MEMBER' | 'VIEWER'>('MEMBER');
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setServerError('');

      await addMemberMutation.mutateAsync({
        projectId,
        email,
        role,
      });

      setEmail('');
      setRole('MEMBER');
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'No se pudo añadir el miembro';

      setServerError(
        Array.isArray(message) ? message.join(', ') : String(message),
      );
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Miembros del proyecto</h2>

      <form onSubmit={handleSubmit} className="mb-6 grid gap-3 md:grid-cols-[1fr_180px_auto]">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email del usuario"
          className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as 'MEMBER' | 'VIEWER')}
          className="rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500"
        >
          <option value="MEMBER">MEMBER</option>
          <option value="VIEWER">VIEWER</option>
        </select>

        <button
          type="submit"
          disabled={addMemberMutation.isPending}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {addMemberMutation.isPending ? 'Añadiendo...' : 'Añadir'}
        </button>
      </form>

      {serverError && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {serverError}
        </div>
      )}

      {isLoading && <p className="text-slate-600">Cargando miembros...</p>}

      {isError && (
        <p className="text-red-600">No se pudieron cargar los miembros.</p>
      )}

      {!isLoading && !isError && members && (
        <div className="grid gap-3">
          {members.map((member) => (
            <article
              key={member.id}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <p className="font-medium text-slate-900">
                {member.name || 'Sin nombre'}
              </p>
              <p className="text-sm text-slate-600">{member.email}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}