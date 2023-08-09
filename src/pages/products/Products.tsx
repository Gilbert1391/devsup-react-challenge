import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  productSelector,
} from '../../features/products/productsSlice';
import { AppDispatch } from '../../store';
import Page from '../../Components/page/Page';
import ProductsTable from '../../Components/productsTable/ProductsTable';
import './Products.css';

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector(productSelector);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <Page>
      <>
        <div className="products-table-header">
          <div>Search bar</div>
          <div>Boton Agregar</div>
        </div>
        <div className="products-table-container">
          <ProductsTable data={products} />
        </div>
      </>
    </Page>
  );
};

export default Products;
