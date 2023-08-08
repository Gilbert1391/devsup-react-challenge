import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from './models';
import api from '../../api';

const sliceName = 'product';

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

export const fetchProducts = createAsyncThunk<Product[]>(
  `${sliceName}/fetchProducts`,
  api.getAll,
);

export const productSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default productSlice.reducer;
