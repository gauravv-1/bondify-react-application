import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.js";

// Async Thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/v1/users/auth/login", credentials);
      console.log("Login Successful:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        return rejectWithValue(data.error || "Authentication failed.");
      } else {
        return rejectWithValue("Network error. Please try again later.");
      }
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/v1/users/auth/signup", credentials);
      console.log("Signup Successful:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        return rejectWithValue(data.error || "Signup failed.");
      } else {
        return rejectWithValue("Network error. Please try again later.");
      }
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/v1/users/auth/getUserProfile");
      console.log("User Profile at fetchUserProfile Thunk:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch user profile."
      );
    }
  }
);

export const completeUserProfile = createAsyncThunk(
  "auth/completeUserProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      console.log("ProfileUpdat Data at Thunk: ",profileData);
      const response = await api.post("/api/v1/users/profile/completeProfile", profileData);
      console.log("Complete Profile Successful:", response.data);
      return response.data; // Assuming the response includes updated user profile
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        return rejectWithValue(data.error || "Failed to complete profile.");
      } else {
        return rejectWithValue("Network error. Please try again later.");
      }
    }
  }
);

// Slice Definition
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Stores logged-in user information
    token: null, // Stores JWT token
    loading: false, // Loading state for API calls
    error: null, // Stores error messages
    successMessage: null, // Stores success messages
    isProfileComplete: false,
    userProfile: null, // Stores userProfiledDto details
    institute: null, // Stores instituteDto details
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("jwt"); // Clear token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data;
        localStorage.setItem("jwt", action.payload.data);
        state.successMessage = "Login Successful!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = null;
      })

      // Signup Cases
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Signup Successful!";
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = null;
      })

      // Fetch User Profile Cases
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isProfileComplete=false;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.isProfileComplete = action.payload.data.isProfileComplete;
        state.userProfile = action.payload.data.userProfiledDto || null;
        state.institute = action.payload.data.userProfiledDto?.instituteDto || null;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Complete User Profile Cases
      .addCase(completeUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(completeUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data; // Assuming response.data contains updated profile
        state.successMessage = "Profile completion successful!";
        state.error = null;
      })
      .addCase(completeUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
