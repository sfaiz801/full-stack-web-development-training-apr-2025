import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todosReducer from '../features/todos/todosSlice';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';
import postsReducer from '../features/posts/postsSlice';
import budgetReducer from '../features/budget/budgetSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    cart: cartReducer,
    auth: authReducer,
    posts: postsReducer,
    budget: budgetReducer
  }
});
