import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    // Add more slices if needed
  },
});

export default store;
