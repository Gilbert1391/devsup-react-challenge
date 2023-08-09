import productsReducer, { fetchProducts } from './productsSlice';
import { Product } from './models';
import productMockData from '../../api/products.json';

describe('Products Slice', () => {
  it('should set loading to true and make products list empty on action pending', () => {
    const action = { type: fetchProducts.pending };
    const state = productsReducer(undefined, action);
    expect(state).toEqual(
      expect.objectContaining({
        products: [],
        isLoading: true,
      }),
    );
  });

  it('should set loading to false and make products list empty on action rejected', () => {
    const action = { type: fetchProducts.rejected };
    const state = productsReducer(undefined, action);
    expect(state).toEqual(
      expect.objectContaining({
        products: [],
        isLoading: false,
      }),
    );
  });

  it('should set loading to false and populate products list on action fulfilled', () => {
    const action = {
      type: fetchProducts.fulfilled,
      payload: productMockData,
    };
    const state = productsReducer(undefined, action);
    expect(state).toEqual(
      expect.objectContaining({
        products: action.payload,
        isLoading: false,
      }),
    );
  });
});
