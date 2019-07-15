import React from 'react';
import ReactDOM from 'react-dom';
import ProductContainer from './ProductContainer.jsx';
import Product from './Product.jsx';

export default class RelatedProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const pid = window.location.pathname.substring(1);
    for (let i = 0; i < 4; i += 1) {
      this.getProduct(pid);
    }
  }

  getProduct(pid) {
    fetch(`http://127.0.0.1:3003/api/${pid}`)
      .then(response => response.json())
      .then((product) => {
        const { products } = this.state;
        products.push(product);
        this.setState({ products });
      });
  }

  render() {
    const { products } = this.state || [];
    return (
      <div>
        <span>You may also like</span>
        <ProductContainer>
          {
            products.map(product => <Product product={product} />)
          }
        </ProductContainer>
      </div>
    );
  }
}

ReactDOM.render(<RelatedProducts />, document.getElementById('related-products'));
