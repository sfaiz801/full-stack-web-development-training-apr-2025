import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [
    { id: 1, title: 'Freelance Frontend Project', amount: 1500, type: 'income', category: 'Salary', date: '2026-09-01' },
    { id: 2, title: 'AWS Cloud Hosting', amount: 85, type: 'expense', category: 'Hosting', date: '2026-09-02' },
    { id: 3, title: 'Coffee & Snacks', amount: 18.5, type: 'expense', category: 'Food', date: '2026-09-03' }
  ]
};

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.unshift({
        id: Date.now(),
        title: action.payload.title,
        amount: Number(action.payload.amount),
        type: action.payload.type,
        category: action.payload.category || 'General',
        date: new Date().toISOString().split('T')[0]
      });
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    }
  }
});

export const { addTransaction, deleteTransaction } = budgetSlice.actions;
export default budgetSlice.reducer;
