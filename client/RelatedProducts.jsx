import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Product from './Product.jsx';

const ProductsContainer = styled.div`
  font-family: Calibre,"Helvetica Neue",Helvetica,Roboto,Arial,sans-serif;
  height: 689px;
  display: grid;
  grid-template-columns: repeat(4, 300px);
  grid-template-rows: 100 550;
  grid-gap: 40px 40px;
  background-color: snow;
`;

const Header = styled.span`
  grid-row: 1 / span 1;
  grid-column: 1 / span 4;
  justify-self: center;
  align-self: end;
  font-family: Calibre,"Helvetica Neue",Helvetica,Roboto,Arial,sans-serif;
  font-size: 48px;
  font-weight: 600;
`;

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
        <ProductsContainer>
          <Header>You may also like</Header>
          {
            products.map(product => <Product key={product.id} product={product} />)
          }
        </ProductsContainer>
      </div>
    );
  }
}

ReactDOM.render(<RelatedProducts />, document.getElementById('related-products'));
