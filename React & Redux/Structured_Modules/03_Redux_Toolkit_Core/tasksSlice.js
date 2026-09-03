import { createSlice, configureStore } from '@reduxjs/toolkit';

/**
 * tasksSlice
 * Demonstrates: createSlice, immutable updates via Immer, action creators, reducers
 */
export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [
      { id: 1, title: 'Learn Redux Toolkit createSlice', completed: true },
      { id: 2, title: 'Configure store with rootReducer', completed: false }
    ],
    filter: 'all' // all | active | completed
  },
  reducers: {
    addTask: (state, action) => {
      // Immer lets us write mutating syntax which safely updates draft state
      state.items.push({
        id: Date.now(),
        title: action.payload,
        completed: false
      });
    },
    toggleTask: (state, action) => {
      const task = state.items.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});

export const { addTask, toggleTask, deleteTask, setFilter } = tasksSlice.actions;

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer
  }
});
