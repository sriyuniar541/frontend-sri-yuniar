import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetcBarangData = createAsyncThunk(
  "barang/fetcBarangData",
  async (idPelabuhan) => {
    try {
      const response = await axios.get(
        `http://202.157.176.100:3000/barangs?filter={"where":{"id_pelabuhan":${idPelabuhan}}}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  }
);

const BarangSlice = createSlice({
  name: "barang",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetcBarangData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetcBarangData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetcBarangData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default BarangSlice.reducer;
