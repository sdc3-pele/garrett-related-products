import React from 'react';
import ProductDescription from './ProductDescription.jsx';
import ProductImage from './ProductImage.jsx';
import StylePicker from './StylePicker.jsx';

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  render() {
    const { isHovered } = this.state;
    return (
      <div>
        <ProductImage />
        {isHovered ? <StylePicker /> : ''}
        <ProductDescription />
      </div>
    );
  }
}
