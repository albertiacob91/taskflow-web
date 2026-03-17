import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import type { DragEndEvent } from '@dnd-kit/core';
import { KanbanColumn } from './kanban-column';
import type { Task } from '../../api/tasks-api';
import { useUpdateTask } from './use-update-task';

type KanbanBoardProps = {
  tasks: Task[];
  projectId: string;
};

const COLUMN_TITLES: Record<'TODO' | 'IN_PROGRESS' | 'DONE', string> = {
  TODO: 'Por hacer',
  IN_PROGRESS: 'En progreso',
  DONE: 'Hecho',
};

export function KanbanBoard({ tasks, projectId }: KanbanBoardProps) {
  const updateTaskMutation = useUpdateTask(projectId);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

  const columns = {
    TODO: tasks.filter((task) => task.status === 'TODO'),
    IN_PROGRESS: tasks.filter((task) => task.status === 'IN_PROGRESS'),
    DONE: tasks.filter((task) => task.status === 'DONE'),
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeTaskId = String(active.id);
    const activeTask = tasks.find((task) => task.id === activeTaskId);

    if (!activeTask) return;

    const targetColumn = String(over.id) as 'TODO' | 'IN_PROGRESS' | 'DONE';

    if (
      targetColumn !== 'TODO' &&
      targetColumn !== 'IN_PROGRESS' &&
      targetColumn !== 'DONE'
    ) {
      return;
    }

    if (activeTask.status === targetColumn) return;

    await updateTaskMutation.mutateAsync({
      taskId: activeTask.id,
      payload: { status: targetColumn },
    });
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="grid gap-4 lg:grid-cols-3">
        <KanbanColumn
          id="TODO"
          title={COLUMN_TITLES.TODO}
          tasks={columns.TODO}
          projectId={projectId}
        />

        <KanbanColumn
          id="IN_PROGRESS"
          title={COLUMN_TITLES.IN_PROGRESS}
          tasks={columns.IN_PROGRESS}
          projectId={projectId}
        />

        <KanbanColumn
          id="DONE"
          title={COLUMN_TITLES.DONE}
          tasks={columns.DONE}
          projectId={projectId}
        />
      </div>
    </DndContext>
  );
}