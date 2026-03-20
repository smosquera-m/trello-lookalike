import { useStore } from './src/store.js';
import fs from 'fs';

// Mock localStorage
const store = {};
global.localStorage = {
  getItem: (key) => store[key] || null,
  setItem: (key, value) => { store[key] = value; },
  removeItem: (key) => { delete store[key]; }
};

// Initial state
console.log('Initial Columns:');
console.log(useStore.getState().columns['column-1'].taskIds);
console.log(useStore.getState().columns['column-2'].taskIds);

// Move task
useStore.getState().moveTask('column-1', 'column-2', 0, 0, 'task-1');

console.log('After move:');
console.log(useStore.getState().columns['column-1'].taskIds);
console.log(useStore.getState().columns['column-2'].taskIds);

console.log('Persisted state:');
console.log(JSON.parse(store['trello-storage']).state.columns['column-1'].taskIds);
console.log(JSON.parse(store['trello-storage']).state.columns['column-2'].taskIds);
