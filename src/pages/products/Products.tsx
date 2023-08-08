import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../features/products/productsSlice';
import { AppDispatch } from '../../store';

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return <div>Products Page</div>;
};

export default Products;
