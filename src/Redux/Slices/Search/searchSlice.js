import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api.js";


export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (searchTerm) => {
    const response = await api.get(
      `/api/v1/users/profile/search?searchTerm=${searchTerm}`
    );
    return response.data.data; // Extracting the data array
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
