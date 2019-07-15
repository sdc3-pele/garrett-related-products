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
    const { product } = this.props;
    const { name, price, styles} = product;
    const jsonStyles = JSON.parse(styles);
    const imageUrl = jsonStyles[0] || '';
    return (
      <div>
        <ProductImage imageUrl={imageUrl} />
        {isHovered ? <StylePicker /> : ''}
        <ProductDescription name={name} price={price} />
      </div>
    );
  }
}
