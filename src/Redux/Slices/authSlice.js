import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.js";

// Utility Function for Handling Errors
const handleError = (error) =>
  error.response?.data?.error || "Network error. Please try again later.";

// Async Thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/v1/users/auth/login", credentials);
      console.log("Login Successful:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
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
      return rejectWithValue(handleError(error));
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/v1/users/auth/getUserProfile");
      console.log("User Profile Fetched:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const completeUserProfile = createAsyncThunk(
  "auth/completeUserProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      console.log("Profile Update Data:", profileData);
      const response = await api.post(
        "/api/v1/users/profile/completeProfile",
        profileData
      );
      console.log("Profile Completion Successful:", response.data);
      return response.data; // Assuming the response includes updated profile details
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// Slice Definition
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("jwt") || null,
    isAuthenticated: !!localStorage.getItem("jwt"), // Derived state based on token
    loading: false,
    error: null,
    successMessage: null,
    isProfileComplete: false,
    userProfile: null,
    institute: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.userProfile = null;
      state.institute = null;
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
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
        const { data } = action.payload;
        state.loading = false;
        state.token = data;
        state.isAuthenticated = true;
        localStorage.setItem("jwt", data);
        state.successMessage = "Login Successful!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Signup Cases
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Signup Successful!";
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch User Profile Cases
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.loading = false;
        state.user = data;
        state.isProfileComplete = data.isProfileComplete || false;
        state.userProfile = data.userProfiledDto || null;
        state.institute = data.userProfiledDto?.instituteDto || null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Complete User Profile Cases
      .addCase(completeUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeUserProfile.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.loading = false;
        state.user = data;
        state.isProfileComplete = true;
        state.successMessage = "Profile Completion Successful!";
      })
      .addCase(completeUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
