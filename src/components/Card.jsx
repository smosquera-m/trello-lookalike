import React from 'react';
import ReactDOM from 'react-dom';
import { Draggable } from '@hello-pangea/dnd';
import { Trash2 } from 'lucide-react';
import { useStore } from '../store';

const Card = ({ task, index, columnId }) => {
  const deleteTask = useStore((state) => state.deleteTask);

  const renderCard = (provided, snapshot) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`card ${snapshot.isDragging ? 'card-dragging' : ''}`}
      style={{
        ...provided.draggableProps.style,
      }}
    >
      <div className="card-actions">
        <button 
          className="action-btn" 
          onClick={() => deleteTask(columnId, task.id)}
          title="Delete task"
        >
          <Trash2 className="icon" />
        </button>
      </div>
      <div className="card-content">
        {task.content}
      </div>
    </div>
  );

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        if (snapshot.isDragging) {
          return ReactDOM.createPortal(
            renderCard(provided, snapshot),
            document.body
          );
        }
        return renderCard(provided, snapshot);
      }}
    </Draggable>
  );
};

export default Card;
