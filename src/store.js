import { create } from 'zustand';

const API_URL = '/api';

export const useStore = create((set, get) => ({
  tasks: {},
  columns: {},
  columnOrder: [],
  isLoading: true,

  fetchBoard: async () => {
    try {
      const res = await fetch(`${API_URL}/board?_t=${Date.now()}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      set({
        tasks: data.tasks || {},
        columns: data.columns || {},
        columnOrder: data.columnOrder || [],
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching board:', error);
      set({ isLoading: false });
    }
  },

  moveTask: async (startColumnId, endColumnId, startIdx, endIdx, taskId) => {
    // 1. Optimistic Update
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

      const startTaskIds = [...startColumn.taskIds];
      startTaskIds.splice(startIdx, 1);
      const newStartColumn = { ...startColumn, taskIds: startTaskIds };

      const endTaskIds = [...endColumn.taskIds];
      endTaskIds.splice(endIdx, 0, taskId);
      const newEndColumn = { ...endColumn, taskIds: endTaskIds };

      return {
        ...state,
        columns: {
          ...state.columns,
          [startColumnId]: newStartColumn,
          [endColumnId]: newEndColumn,
        },
      };
    });

    // 2. API Call
    try {
      await fetch(`${API_URL}/tasks/move`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startColumnId, endColumnId, startIdx, endIdx, taskId }),
      });
    } catch (error) {
      console.error('Error moving task:', error);
      // Let it fail silently or refetch
      get().fetchBoard();
    }
  },

  addTask: async (columnId, content) => {
    const taskId = `task-${Date.now()}`;
    // Optimistic Update
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

    // API Call
    try {
      await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taskId, column_id: columnId, content }),
      });
    } catch (error) {
      console.error('Error adding task:', error);
      get().fetchBoard();
    }
  },

  addColumn: async (title) => {
    const columnId = `column-${Date.now()}`;
    // Optimistic Update
    set((state) => ({
      ...state,
      columns: {
        ...state.columns,
        [columnId]: { id: columnId, title, taskIds: [] },
      },
      columnOrder: [...state.columnOrder, columnId],
    }));

    // API Call
    try {
      await fetch(`${API_URL}/columns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: columnId, title }),
      });
    } catch (error) {
      console.error('Error adding column:', error);
      get().fetchBoard();
    }
  },

  deleteTask: async (columnId, taskId) => {
    // Optimistic Update
    set((state) => {
      const newTaskIds = state.columns[columnId].taskIds.filter((id) => id !== taskId);
      const { [taskId]: deletedTask, ...remainingTasks } = state.tasks;
      return {
        ...state,
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

    // API Call
    try {
      await fetch(`${API_URL}/tasks/${taskId}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Error deleting task:', error);
      get().fetchBoard();
    }
  },
}));
