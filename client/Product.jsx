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
  position: relative;
  height: auto;
  width: 300px;
`;

const StylePicker = styled.div`
  width: 300px;
  height: 50px;
  z-index: 10;
  background: white;
  position: absolute;
  bottom: 0;
`;

const swatchesContainer = styled.div`
  height: 35px;
  width: 255px;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
`;

const swatch = styled.div`
  height: 28px;
  widght: 57.5px;
  background: url(${JSON.parse(this.props.style_thumbnails)})
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
    const { name, price, styles, style_thumbnails } = product;
    const jsonThumbnails = JSON.parse(style_thumbnails);
    const jsonStyles = JSON.parse(styles);
    const imageUrl = jsonStyles[0] || '';
    return (
      <div
        onMouseOver={() => this.handleMouseOver()}
        onMouseLeave={() => this.handleMouseOut()}
      >
        <ProductContainer>
          <ProductImage>
            {
              isHovered
                ? (
                  <StylePicker>
                    <swatchesContainer>
                      {jsonThumbnails.map(thumbnail => <img alt="pick a style" src={thumbnail} />)}
                    </swatchesContainer>
                  </StylePicker>
                )
                : ''
            }
            <img
              alt="Related Product"
              src={imageUrl}
              style={{ width: '300px' }}
            />
          </ProductImage>
          <ProductDescription>
            <div>{name}</div>
            <div>
              {`$${price} USD`}
            </div>
          </ProductDescription>
        </ProductContainer>
      </div>
    );
  }
}
