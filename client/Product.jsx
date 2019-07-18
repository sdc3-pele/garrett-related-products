import React from 'react';
import styled from 'styled-components';
// import ProductDescription from './ProductDescription.jsx';
// import ProductImage from './ProductImage.jsx';
// import StylePicker from './StylePicker.jsx';

const ProductContainer = styled.div`
  grid-column: auto;
  grid-row: 2 / span 1;
`;

const ProductImage = styled.div`
  height: auto;
  width: 300px;
`;

const StylePicker = styled.div`
  width: 300px;
  height: 60px;
  z-index: 10;
  background: white;
  position: fixed;
`;

const ProductDescription = styled.div`
  text-align: left;
`;

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  handleMouseOver() {
    this.setState({ isHovered: true });
  }

  handleMouseOut() {
    this.setState({ isHovered: false });
  }

  render() {
    const { isHovered } = this.state;
    const { product } = this.props;
    const { name, price, styles } = product;
    const jsonStyles = JSON.parse(styles);
    const imageUrl = jsonStyles[0] || '';
    return (
      <ProductContainer>
        <ProductImage>
          <div>{isHovered ? <StylePicker /> : ''}</div>
          <img
            alt="Related Product"
            src={imageUrl}
            onMouseOver={() => this.handleMouseOver()}
            onMouseOut={() => this.handleMouseOut()}
          />
        </ProductImage>

        <ProductDescription>
          <div>{name}</div>
          <div>
            {`$${price} USD`}
          </div>
        </ProductDescription>
      </ProductContainer>
    );
  }
}
