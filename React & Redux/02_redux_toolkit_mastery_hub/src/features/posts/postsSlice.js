import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunk for simulated / real API fetch
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      // Fetch public dummy JSON posts
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
      if (!res.ok) throw new Error('Failed to fetch posts from server');
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Unknown network error');
    }
  }
);

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  searchQuery: ''
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    deletePost: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to load posts';
      });
  }
});

export const { setSearchQuery, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
