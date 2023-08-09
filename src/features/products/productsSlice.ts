import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from './models';
import api from '../../api';
import { RootState } from '../../store';

const sliceName = 'product';

interface ProductState {
  products: Product[];
  isLoading: boolean;
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
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
    builder.addCase(fetchProducts.pending, (state) => {
      state.products = [];
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.products = [];
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    });
  },
});

export const productSelector = (state: RootState) => ({
  products: state.products.products,
});

export default productSlice.reducer;
