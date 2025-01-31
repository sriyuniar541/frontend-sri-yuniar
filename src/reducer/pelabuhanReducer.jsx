import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPelabuhanData = createAsyncThunk(
  'pelabuhan/fetchPelabuhanData',
  async (idNegara) => {
    try {
      const response = await axios.get(`http://202.157.176.100:3000/pelabuhans?filter={"where":{"id_negara":${idNegara}}}`);
      console.log(idNegara);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  }
);

const pelabuhanSlice = createSlice({
  name: 'pelabuhan',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPelabuhanData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPelabuhanData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchPelabuhanData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default pelabuhanSlice.reducer;
