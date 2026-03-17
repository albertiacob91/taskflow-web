import { useEffect, useState } from 'react';
import { socket } from '../../lib/socket';

export function useProjectPresence(projectId: string) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (!projectId) return;

    const handler = (data: { count: number }) => {
      setCount(data.count);
    };

    socket.on('presenceUpdated', handler);

    return () => {
      socket.off('presenceUpdated', handler);
    };
  }, [projectId]);

  return count;
}