import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  step: 1,
  history: []
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += state.step;
      state.history.unshift(`+${state.step} (Total: ${state.value})`);
    },
    decrement: (state) => {
      state.value -= state.step;
      state.history.unshift(`-${state.step} (Total: ${state.value})`);
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
      state.history.unshift(`+${action.payload} custom (Total: ${state.value})`);
    },
    setStep: (state, action) => {
      state.step = Math.max(1, Number(action.payload) || 1);
    },
    reset: (state) => {
      state.value = 0;
      state.history.unshift('Counter reset to 0');
    }
  }
});

export const { increment, decrement, incrementByAmount, setStep, reset } = counterSlice.actions;
export default counterSlice.reducer;
