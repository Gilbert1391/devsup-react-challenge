import React from 'react';
import { useParams } from 'react-router-dom';

type ProductDetailsProps = {};

const ProductDetails: React.FC<ProductDetailsProps> = () => {
  const { id } = useParams();
  return <div>Products Details {id}</div>;
};

export default ProductDetails;
