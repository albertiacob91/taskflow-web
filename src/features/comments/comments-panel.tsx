import { useTaskComments } from './use-task-comments';
import { CreateCommentForm } from './create-comment-form';

type CommentsPanelProps = {
  taskId: string;
};

export function CommentsPanel({ taskId }: CommentsPanelProps) {
  const { data, isLoading, isError } = useTaskComments(taskId);

  return (
    <section
      style={{
        marginTop: '16px',
        borderTop: '1px solid #eee',
        paddingTop: '16px',
      }}
    >
      <h4 style={{ marginTop: 0 }}>Comentarios</h4>

      <CreateCommentForm taskId={taskId} />

      {isLoading && <p>Cargando comentarios...</p>}

      {isError && (
        <p style={{ color: 'crimson' }}>
          No se pudieron cargar los comentarios.
        </p>
      )}

      {!isLoading && !isError && data?.items.length === 0 && (
        <p style={{ color: '#666' }}>No hay comentarios todavía.</p>
      )}

      {!isLoading && !isError && data && data.items.length > 0 && (
        <div style={{ display: 'grid', gap: '10px', marginTop: '16px' }}>
          {data.items.map((comment) => (
            <article
              key={comment.id}
              style={{
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '12px',
              }}
            >
              <p style={{ margin: '0 0 8px' }}>{comment.content}</p>
              <small style={{ color: '#777' }}>
                {comment.author?.name || comment.author?.email || 'Usuario'} ·{' '}
                {new Date(comment.createdAt).toLocaleString()}
              </small>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}