import React, { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Plus, X } from 'lucide-react';
import Column from './Column';
import { useStore } from '../store';

const Board = () => {
  const { tasks, columns, columnOrder, moveTask, addColumn } = useStore();
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

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

  const handleAddColumn = (e) => {
    e.preventDefault();
    if (newColumnTitle.trim()) {
      addColumn(newColumnTitle.trim());
      setNewColumnTitle('');
      setIsAddingColumn(false);
    }
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

        {isAddingColumn ? (
          <div className="add-column-card is-adding" style={{ justifyContent: 'flex-start', alignItems: 'stretch' }}>
            <form onSubmit={handleAddColumn} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input
                type="text"
                autoFocus
                placeholder="Enter list title..."
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                className="add-column-input"
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button type="submit" className="add-column-submit">Add list</button>
                <button 
                  type="button" 
                  className="add-column-cancel"
                  onClick={() => setIsAddingColumn(false)}
                >
                  <X size={20} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="add-column-card" onClick={() => setIsAddingColumn(true)}>
            <Plus className="icon" style={{ width: '32px', height: '32px', marginBottom: '0.5rem', opacity: 0.5 }} />
            <span style={{ color: 'var(--text-dim)', fontWeight: 600 }}>Add another list</span>
          </div>
        )}
      </div>
    </DragDropContext>
  );
};

export default Board;
