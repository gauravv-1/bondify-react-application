import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api.js";

// Async Thunk for Fetching Institutes
export const fetchInstitutes = createAsyncThunk(
  "institute/fetchInstitutes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/v1/connections/institute/getAllInstitutes");
      console.log("Fetched Institutes:", response.data.data);
      return response.data.data; // Assuming response.data.data contains the list of institutes
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch institutes."
      );
    }
  }
);

// Slice Definition
const instituteSlice = createSlice({
  name: "institute",
  initialState: {
    institutes: [], // Stores the list of institutes
    loading: false, // Loading state for the API call
    error: null, // Stores error messages, if any
  },
  reducers: {
    clearInstitutes: (state) => {
      state.institutes = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Institutes Cases
      .addCase(fetchInstitutes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstitutes.fulfilled, (state, action) => {
        state.loading = false;
        state.institutes = action.payload; // Populate the state with fetched institutes
        state.error = null;
      })
      .addCase(fetchInstitutes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error message
      });
  },
});

// Exporting Actions and Reducer
export const { clearInstitutes } = instituteSlice.actions;
export default instituteSlice.reducer;
