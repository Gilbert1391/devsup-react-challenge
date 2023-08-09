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

export const createProduct = createAsyncThunk<Product[], Product>(
  `${sliceName}/createProduct`,
  api.post,
);

export const updateProduct = createAsyncThunk<Product[], Product>(
  `${sliceName}/updateProduct`,
  api.put,
);

export const deleteProduct = createAsyncThunk<string, string>(
  `${sliceName}/deleteProduct`,
  api.delete,
);

export const productSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    });

    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      const products = state.products;
      products.push(action.payload[0]);
      state.isLoading = false;
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const newProduct = action.payload[0];
      const index = state.products.findIndex((e) => e.id === newProduct.id);
      state.products.splice(index, 1, newProduct);
      state.isLoading = false;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter((e) => e.id !== action.payload);
      state.isLoading = false;
    });
  },
});

export const productSelector = (state: RootState) => ({
  products: state.products.products,
});

export default productSlice.reducer;
