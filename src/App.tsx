import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Products from './pages/products/Products';
import ProductDetails from './pages/product-details/ProductDetails';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<Products />} />
        <Route path="/new-product" element={<ProductDetails />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
