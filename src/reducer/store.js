// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import negaraReducer from './negaraReducer';
import pelabuhanReducer from './pelabuhanReducer';
import barangReducer from './barangReducer';

const store = configureStore({
  reducer: {
    negara: negaraReducer,
    pelabuhan: pelabuhanReducer,
    barang: barangReducer,
  },
});

export default store;
