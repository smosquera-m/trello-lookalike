import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Plus, MoreHorizontal } from 'lucide-react';
import Card from './Card';
import { useStore } from '../store';

const Column = ({ column, tasks, index }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newContent, setNewContent] = useState('');
  const addTask = useStore((state) => state.addTask);

  const handleAddTask = () => {
    if (newContent.trim()) {
      addTask(column.id, newContent);
      setNewContent('');
      setIsAdding(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAddTask();
    if (e.key === 'Escape') setIsAdding(false);
  };

  return (
    <div className="column" data-column-id={column.id}>
      <div className="column-header">
        <h3 className="column-title">{column.title}</h3>
        <MoreHorizontal className="icon" style={{ cursor: 'pointer', color: 'var(--text-dim)' }} />
      </div>

      <Droppable droppableId={column.id} type="task">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`task-list ${snapshot.isDraggingOver ? 'list-dragging-over' : ''}`}
          >
            {tasks.map((task, index) => (
              <Card key={task.id} task={task} index={index} columnId={column.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isAdding ? (
        <div style={{ padding: '0 0.75rem 0.75rem' }}>
          <textarea
            autoFocus
            className="card"
            style={{ 
              width: '100%', 
              minHeight: '60px', 
              background: 'rgba(255, 255, 255, 0.1)',
              resize: 'none',
              marginBottom: '0.5rem',
              outline: 'none',
              border: '1px solid var(--primary)'
            }}
            placeholder="Enter task content..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="action-btn" 
              style={{ padding: '0.4rem 1rem', background: 'var(--primary)', color: 'white', borderRadius: '6px' }}
              onClick={handleAddTask}
            >
              Add Card
            </button>
            <button 
              className="action-btn" 
              style={{ padding: '0.4rem 0.75rem' }} 
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button className="add-button" onClick={() => setIsAdding(true)}>
          <Plus className="icon" />
          Add a card
        </button>
      )}
    </div>
  );
};

export default Column;
