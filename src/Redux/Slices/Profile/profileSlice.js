import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api.js";

// Async Thunks
export const getRequestedUsersProfile = createAsyncThunk(
  "user/getRequestedUsersProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/v1/users/auth/${userId}/getRequestedUsersProfile`);
      console.log("Requested Users Data at getRequestedUsersProfile Thunk ",response.data);
      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch user profile.");
    }
  }
);

export const getConnectionStatus = createAsyncThunk(
  "user/getConnectionStatus",
  async (userId, { rejectWithValue }) => {
    try {
      console.log("attempting getConnectionStatus at Thunk..")
      const response = await api.post(`/api/v1/connections/core/${userId}/getConnectionStatus`);
      console.log("Requested Users Connection Data at getConnectionStatus Thunk ",response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch connection status.");
    }
  }
);

export const sendConnectionRequest = createAsyncThunk(
  "user/sendConnectionRequest",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/v1/connections/core/request/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to send connection request.");
    }
  }
);

// Slice Definition
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    connectionStatus: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRequestedUsersProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRequestedUsersProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
      })
      .addCase(getRequestedUsersProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getConnectionStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConnectionStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.connectionStatus = action.payload.data;
      })
      .addCase(getConnectionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendConnectionRequest.fulfilled, (state, action) => {
        state.connectionStatus = { ...state.connectionStatus, isRequested: true };
      });
  },
});

export default profileSlice.reducer;
