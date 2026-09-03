import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  role: 'Guest',
  preferences: {
    theme: 'dark',
    emailNotifications: true
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = {
        name: action.payload.name || 'Faiz Siddiqui',
        email: action.payload.email || 'faiz@example.com',
        avatar: action.payload.avatar || 'FS'
      };
      state.role = action.payload.role || 'Full Stack Engineer';
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = 'Guest';
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    toggleNotifications: (state) => {
      state.preferences.emailNotifications = !state.preferences.emailNotifications;
    }
  }
});

export const { login, logout, updateProfile, toggleNotifications } = authSlice.actions;
export default authSlice.reducer;
