import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      const { productId, quantity } = action.payload;
      state.push({ id: productId, quantity });
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      return state.filter((product) => product.id !== productId);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.find((product) => product.id === productId);
      if (product) {
        product.quantity = quantity;
      }
    },
  },
});

export const { addProduct, removeProduct, updateQuantity } = productSlice.actions;
export default productSlice.reducer;
