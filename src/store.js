import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Explore the new Trello board' },
    'task-2': { id: 'task-2', content: 'Try dragging cards between columns' },
    'task-3': { id: 'task-3', content: 'Add a new task using the button below' },
    'task-4': { id: 'task-4', content: 'Double click cards to edit (coming soon)' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-3'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-4'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export const useStore = create(
  persist(
    (set) => ({
      ...initialData,
      
      moveTask: (startColumnId, endColumnId, startIdx, endIdx, taskId) => {
        set((state) => {
          const startColumn = state.columns[startColumnId];
          const endColumn = state.columns[endColumnId];

          if (startColumnId === endColumnId) {
            const newTaskIds = [...startColumn.taskIds];
            newTaskIds.splice(startIdx, 1);
            newTaskIds.splice(endIdx, 0, taskId);

            return {
              ...state,
              columns: {
                ...state.columns,
                [startColumnId]: {
                  ...startColumn,
                  taskIds: newTaskIds,
                },
              },
            };
          }

          // Moving from one column to another
          const startTaskIds = [...startColumn.taskIds];
          startTaskIds.splice(startIdx, 1);
          const newStartColumn = {
            ...startColumn,
            taskIds: startTaskIds,
          };

          const endTaskIds = [...endColumn.taskIds];
          endTaskIds.splice(endIdx, 0, taskId);
          const newEndColumn = {
            ...endColumn,
            taskIds: endTaskIds,
          };

          return {
            ...state,
            columns: {
              ...state.columns,
              [startColumnId]: newStartColumn,
              [endColumnId]: newEndColumn,
            },
          };
        });
      },

      addTask: (columnId, content) => {
        const taskId = `task-${Date.now()}`;
        set((state) => ({
          tasks: {
            ...state.tasks,
            [taskId]: { id: taskId, content },
          },
          columns: {
            ...state.columns,
            [columnId]: {
              ...state.columns[columnId],
              taskIds: [...state.columns[columnId].taskIds, taskId],
            },
          },
        }));
      },

      addColumn: (title) => {
        const columnId = `column-${Date.now()}`;
        set((state) => ({
          columns: {
            ...state.columns,
            [columnId]: {
              id: columnId,
              title,
              taskIds: [],
            },
          },
          columnOrder: [...state.columnOrder, columnId],
        }));
      },
      
      deleteTask: (columnId, taskId) => {
        set((state) => {
          const newTaskIds = state.columns[columnId].taskIds.filter(id => id !== taskId);
          const { [taskId]: deletedTask, ...remainingTasks } = state.tasks;
          return {
            tasks: remainingTasks,
            columns: {
              ...state.columns,
              [columnId]: {
                ...state.columns[columnId],
                taskIds: newTaskIds,
              },
            },
          };
        });
      },
    }),
    {
      name: 'trello-storage',
    }
  )
);
