import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNegaraData = createAsyncThunk(
  "negara/fetchNegaraData",
  async () => {
    try {
      const response = await axios.get("http://202.157.176.100:3000/negaras");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  }
);

const negaraSlice = createSlice({
  name: "negara",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNegaraData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNegaraData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchNegaraData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default negaraSlice.reducer;
