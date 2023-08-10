import productsReducer, {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from './productsSlice';
import { Product } from './models';
import productMockData from '../../api/products.json';
import { store } from '../../store';

describe('Products Slice', () => {
  it('should set loading to true on action fetchProducts pending', () => {
    const action = { type: fetchProducts.pending };
    const state = productsReducer(undefined, action);
    expect(state.isLoading).toBeTruthy();
  });
  it('should set loading to false on action fetchProducts rejected', () => {
    const action = { type: fetchProducts.rejected };
    const state = productsReducer(undefined, action);
    expect(state.isLoading).toBeFalsy();
  });
  it('should populate products list and set loading to false on action fetchProducts fulfilled', () => {
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

  it('should set loading to true on action createProduct pending', () => {
    const action = {
      type: createProduct.pending,
    };
    const state = productsReducer(undefined, action);
    expect(state.isLoading).toBeTruthy();
  });
  it('should set loading to false on action createProduct rejected', () => {
    const action = {
      type: createProduct.rejected,
    };
    const state = productsReducer(undefined, action);
    expect(state.isLoading).toBeFalsy();
  });
  it('should add created product to products list and set loading to false on action createProduct fulfilled', () => {
    const action = {
      type: createProduct.fulfilled,
      payload: [productMockData[0]],
    };
    const state = productsReducer(undefined, action);
    expect(state.products).toContain(action.payload[0]);
    expect(state.isLoading).toBeFalsy();
  });

  it('should add updated product in products list and set loading to false on action updateProduct fulfilled', () => {
    const newProduct = {
      id: '1',
      name: 'Updated',
      description: 'Acumula millaz',
      logo: 'erterterter',
      date_release: '2023-08-01T00:00:00.000+00:00',
      date_revision: '2024-08-01T00:00:00.000+00:00',
    };
    const action = {
      type: updateProduct.fulfilled,
      payload: newProduct,
    };
    const state = productsReducer(undefined, action);
    expect(state.products.find((e) => e.id === action.payload.id)).toEqual(
      newProduct,
    );
    expect(state.isLoading).toBeFalsy();
  });

  it('should remove product from products list and set loading to false and on action deleteProduct fulfilled', () => {
    let state = productsReducer(undefined, {
      type: fetchProducts.fulfilled,
      payload: productMockData,
    });

    state = productsReducer(state, {
      type: deleteProduct.fulfilled,
      payload: '2',
    });
    expect(state.products.length).toEqual(2);
    expect(state.products[0].id).toEqual('1');
    expect(state.products[1].id).toEqual('3');
    expect(state.isLoading).toBeFalsy();
  });
});
