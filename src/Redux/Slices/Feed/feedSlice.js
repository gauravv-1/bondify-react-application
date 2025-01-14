import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

// Thunks for API calls

// Fetch initial posts
export const fetchInitialPosts = createAsyncThunk(
  "feed/fetchInitialPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/v1/posts/core/feed/getUnseenPosts?page=0&size=10");
      return response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Check for new posts
export const checkForNewPosts = createAsyncThunk(
  "feed/checkForNewPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/v1/posts/core/feed/getUnseenPosts?page=0&size=10");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Mark posts as seen
export const markPostsAsSeen = createAsyncThunk(
  "feed/markPostsAsSeen",
  async (postIds, { rejectWithValue }) => {
    try {
      await api.post("/api/v1/posts/core/feed/mark-seen", postIds);
      return postIds;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Feed slice
const feedSlice = createSlice({
  name: "feed",
  initialState: {
    posts: [],
    newPosts: [],
    seenPosts: [],
    loading: false,
    error: null,
    showRefreshButton: false,
  },
  reducers: {
    refreshPosts(state) {
      const uniqueNewPosts = state.newPosts.filter(
        (newPost) => !state.posts.some((post) => post.id === newPost.id)
      );
      state.posts = [...uniqueNewPosts, ...state.posts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      state.newPosts = [];
      state.showRefreshButton = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchInitialPosts
      .addCase(fetchInitialPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInitialPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchInitialPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch posts";
      })
      // Handle checkForNewPosts
      .addCase(checkForNewPosts.fulfilled, (state, action) => {
        state.newPosts = action.payload;
        state.showRefreshButton = action.payload.length > 0;
      })
      .addCase(checkForNewPosts.rejected, (state, action) => {
        state.error = action.payload || "Failed to check for new posts";
      })
      // Handle markPostsAsSeen
      .addCase(markPostsAsSeen.fulfilled, (state, action) => {
        state.seenPosts = [...state.seenPosts, ...action.payload];
      })
      .addCase(markPostsAsSeen.rejected, (state, action) => {
        state.error = action.payload || "Failed to mark posts as seen";
      });
  },
});

export const { refreshPosts } = feedSlice.actions;
export default feedSlice.reducer;
