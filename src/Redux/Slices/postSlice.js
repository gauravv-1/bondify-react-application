import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.js";

// Thunk for uploading an image
export const uploadImage = createAsyncThunk(
  "post/uploadImage",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/api/v1/uploads/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && typeof response.data === "string") {
        return response.data; // Return image URL
      }

      throw new Error("Invalid response data for image upload");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to upload image."
      );
    }
  }
);

// Thunk for creating a post
export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ content, file, userName, profilePicUrl, postType }, { dispatch, rejectWithValue }) => {
    try {
      let imageUrl = null;

      if (file) {
        const uploadResponse = await dispatch(uploadImage(file)).unwrap();
        imageUrl = uploadResponse;
      }

      const postBody = {
        content,
        imageUrl: imageUrl ? [imageUrl] : [],
        profilePicUrl,
        userName,
        postType,
      };

      const response = await api.post("/api/v1/posts/core/post", postBody);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to create post."
      );
    }
  }
);

// Thunk for fetching posts
export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/v1/posts/core/users/${userId}/allPosts`);
      return response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch posts."
      );
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload); // Add new post at the top
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
