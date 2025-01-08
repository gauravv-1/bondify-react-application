import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.js"; 


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
        return rejectWithValue(data.data.error || "Authentication failed.");
      } else {
        return rejectWithValue("Network error. Please try again later.");
      }
    }
  }
);

// Async thunk for signup
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
        return rejectWithValue(data.data.error || "Signup failed.");
      } else {
        console.log("Net error");
        return rejectWithValue("Network error. Please try again later.");
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("jwt");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Case
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data;
        localStorage.setItem("jwt", action.payload.data);
        state.error = null;
        state.successMessage = "Login Successful!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = null;
      })
      
      // Signup Case
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;  // Store user data on successful signup
        state.token = action.payload.data.id;  // Store token if needed
        localStorage.setItem("jwt", action.payload.data.id);  // Store token or ID in localStorage
        state.error = null;
        state.successMessage = "Signup Successful!";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
