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
  height: 70px;
  z-index: 10;
  background: white;
  position: absolute;
  overflow: hidden;
  align-self: center;
  bottom: 0;
`;

const SwatchesContainer = styled.div`
  height: 35px;
  width: 255px;
  display: grid;
  grid-column-gap: 0.9rem;
  grid-row-gap: 1rem;
  grid-template-rows: [swatches] 1fr;
  grid-template-columns: 1fr [swatch0] 57.5px [swatch1] 57.5px [swatch2] 57.5px [swatch3] 57.5px 1fr;
  position: absolute;
  margin-left: 15px;
  top: 15%;
  align: left;
`;

const Swatch = styled.div`
  grid-row: swatches;
  grid-column: swatch${props => props.index};
  height: 28px;
  width: 57.5px;
  background: url("${props => props.url}");
  margin: 0px;
  margin-top: 8px;
  outline: ${props => props.selectedStyle === props.index ? 'solid 0.5px black' : 'none'};
  outline-offset: 2px;
`;

const ProductDescription = styled.div`
  position: relative;
  text-align: left;
`;

const ProductName = styled.div`
  position: relative;
  margin: 10px 0 10px 0;
  font-weight: bold;
`;

const ProductCurrency = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 75%;
  letter-spacing: 0.1rem;
`;

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  handleStyleHover(index, productIndex) {
    const { selectStyle } = this.props;
    selectStyle(index, productIndex);
  }

  handleMouseOver() {
    this.setState({ isHovered: true });
  }

  handleMouseOut() {
    this.setState({ isHovered: false });
  }

  render() {
    const { isHovered } = this.state;
    const { product, productIndex } = this.props;
    const {
      name,
      price,
      selectedStyle,
      styles,
      style_thumbnails,
    } = product;
    const jsonThumbnails = JSON.parse(style_thumbnails);
    const jsonStyles = JSON.parse(styles);
    const imageUrl = jsonStyles[selectedStyle] || '';
    return (
      <div
        onMouseOver={() => this.handleMouseOver()}
        onMouseLeave={() => this.handleMouseOut()}
        onFocus={() => this.handleMouseOver()}
      >
        <ProductContainer>
          <ProductImage>
            {
              isHovered
                ? (
                  <StylePicker>
                    <SwatchesContainer>
                      {jsonThumbnails.map((thumbnail, index) => (
                        <div onMouseOver={() => this.handleStyleHover(index, productIndex)} onFocus={() => this.handleStyleHover(index, productIndex)}>
                          <Swatch
                            url={jsonThumbnails[index]}
                            index={index}
                            selectedStyle={selectedStyle}
                          />
                        </div>
                      ))}
                    </SwatchesContainer>
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
            <ProductName>{name}</ProductName>
            <div>
              {`$${price} `}
              <ProductCurrency>USD</ProductCurrency>
            </div>
          </ProductDescription>
        </ProductContainer>
      </div>
    );
  }
}
