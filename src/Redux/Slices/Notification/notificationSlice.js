import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../../services/api.js";

// Fetch notifications by user ID
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (userId, { rejectWithValue }) => {
    try {
        // console.log("User at Notification Page: ",user);
      const response = await api.get(
        `/api/v1/notifications/core/getNotificationsByUserId/${userId}`
      );
      console.log("Response Data at fetchNotifications thunk ",response.data);
      return response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
       
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Send connection request
export const sendConnectionRequest = createAsyncThunk(
  'notifications/sendConnectionRequest',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/api/v1/connections/core/request/${userId}`
      );
      return { userId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendConnectionRequest.fulfilled, (state, action) => {
        const { userId } = action.payload;
        const notification = state.notifications.find(
          (notif) => notif.userId === userId
        );
        if (notification) {
          notification.isRequested = true; // Update UI state
        }
      });
  },
});

export default notificationSlice.reducer;
