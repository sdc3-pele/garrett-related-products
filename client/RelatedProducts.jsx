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
    const pid = window.location.pathname.substring(4);
    for (let i = 0; i < 4; i += 1) {
      const currentPid = parseInt(pid, 10) + (i * 4);
      console.log(currentPid);
      this.getProduct(currentPid);
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
            products.map(product => <Product key={product.id} product={product} />)
          }
        </ProductContainer>
      </div>
    );
  }
}

ReactDOM.render(<RelatedProducts />, document.getElementById('related-products'));
