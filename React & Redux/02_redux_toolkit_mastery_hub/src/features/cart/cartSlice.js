import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 'p1', name: 'Mechanical RGB Keyboard', price: 89.99, quantity: 1, icon: 'fa-keyboard' },
    { id: 'p2', name: 'Wireless Gaming Mouse', price: 49.99, quantity: 2, icon: 'fa-computer-mouse' }
  ],
  couponCode: '',
  discountPercent: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
    applyCoupon: (state, action) => {
      const code = action.payload.toUpperCase().trim();
      if (code === 'REDUX20') {
        state.couponCode = code;
        state.discountPercent = 20;
      } else if (code === 'SAVE10') {
        state.couponCode = code;
        state.discountPercent = 10;
      } else {
        state.couponCode = '';
        state.discountPercent = 0;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.couponCode = '';
      state.discountPercent = 0;
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, applyCoupon, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
