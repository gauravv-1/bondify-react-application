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
          "Content-Type": "multipart/form-data", // Axios automatically sets the boundary
        },
      });

      // Ensure we are receiving a valid URL in the response
      if (response.data && typeof response.data === "string") {
        console.log("Image URL from upload:", response.data);
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
  async ({ content, file, userName, profilePicUrl }, { dispatch, rejectWithValue }) => {
    try {
      console.log("createPost thunk triggered");
      let imageUrl = null;

      // Check if an image file is provided
      if (file) {
        const uploadResponse = await dispatch(uploadImage(file)).unwrap();
        imageUrl = uploadResponse; // Extract the uploaded image URL
      }

      // Construct the post body
      const postBody = {
        content,
        imageUrl: imageUrl ? [imageUrl] : [], // Add image URL to the post body if exists
        profilePicUrl,
        userName,
      };

      console.log("Post payload:", postBody);

      // API call to create a post
      const response = await api.post("/api/v1/posts/core", postBody);
      return response.data; // Return created post data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to create post."
      );
    }
  }
);

export const fetchPosts = createAsyncThunk(
    "post/fetchPosts",
    async (userId, { rejectWithValue }) => {
      try {
        console.log("At fetchPosts Thunk.. Featching posts for userId: ",userId);
        const response = await api.get(`/api/v1/posts/core/users/${userId}/allPosts`);
        console.log("Post data res from fetchPosts at Thunk: ",response.data.data);
        return response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.error || "Failed to fetch posts."
        );
      }
    }
  );

// Post slice definition
const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [], // Array of posts
    loading: false, // Loading state for post actions
    error: null, // Error message
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createPost thunk states
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload); // Add the newly created post to the top
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      })

      // Handle uploadImage thunk states (optional if needed for feedback)
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //FetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload; // Populate posts array
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message
      });
  },
});

export default postSlice.reducer;
