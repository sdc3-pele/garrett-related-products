import React from 'react';

const ProductDescription = ({ name, price }) => (
  <div>
    <p>{name}</p>
    <p>{`$${price} USD`}</p>
  </div>
);

export default ProductDescription;
