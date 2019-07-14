import React from 'react';
import ReactDOM from 'react-dom';
import ProductContainer from './ProductContainer.jsx';
import Product from './Product.jsx';

export default class RelatedProducts extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <span>You may also like</span>
        <ProductContainer>
          {
            [1, 2, 3, 4].map(id => <Product id={id} />)
          }
        </ProductContainer>
      </div>
    );
  }
}

ReactDOM.render(<RelatedProducts />, document.getElementById('related-products'));
