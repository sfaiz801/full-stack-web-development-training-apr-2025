import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 1, text: 'Learn Redux Toolkit createSlice', completed: true, category: 'Learning' },
    { id: 2, text: 'Build React-Redux Todo Application', completed: true, category: 'Coding' },
    { id: 3, text: 'Implement Async Thunk for API Calls', completed: false, category: 'Work' }
  ],
  filter: 'all' // 'all', 'active', 'completed'
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items.unshift({
        id: Date.now(),
        text: action.payload.text,
        category: action.payload.category || 'General',
        completed: false
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter(t => !t.completed);
    }
  }
});

export const { addTodo, toggleTodo, deleteTodo, setFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
