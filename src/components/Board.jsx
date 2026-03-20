import React from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import Column from './Column';
import { useStore } from '../store';

const Board = () => {
  const { tasks, columns, columnOrder, moveTask, addColumn } = useStore();

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'task') {
      moveTask(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      );
    }
  };

  const handleAddColumn = () => {
    const title = prompt('Enter column title:');
    if (title) addColumn(title);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-container">
        {columnOrder.map((columnId, index) => {
          const column = columns[columnId];
          const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);

          return (
            <Column
              key={column.id}
              column={column}
              tasks={columnTasks}
              index={index}
            />
          );
        })}

        <div className="add-column-card" onClick={handleAddColumn}>
          <Plus className="icon" style={{ width: '32px', height: '32px', marginBottom: '0.5rem', opacity: 0.5 }} />
          <span style={{ color: 'var(--text-dim)', fontWeight: 600 }}>Add another list</span>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
