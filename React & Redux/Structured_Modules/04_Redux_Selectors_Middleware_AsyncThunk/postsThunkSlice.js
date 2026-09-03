import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

/**
 * Async Thunk for External REST API Data Fetching
 */
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (limit = 5, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
      if (!response.ok) throw new Error('API Network Error');
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    searchQuery: '',
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetPosts: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
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
        state.error = action.payload || 'Unknown Error';
      });
  }
});

export const { setSearchQuery, resetPosts } = postsSlice.actions;

// Base input selectors
const selectPostsItems = (state) => state.posts.items;
const selectSearchQuery = (state) => state.posts.searchQuery;

// Memoized Selector (Reselect pattern) to avoid redundant recalculation
export const selectFilteredPosts = createSelector(
  [selectPostsItems, selectSearchQuery],
  (items, query) => {
    if (!query) return items;
    return items.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
  }
);
