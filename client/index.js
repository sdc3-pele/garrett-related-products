import React from 'react';
import ReactDOM from 'react-dom';

export default class Test extends React.Component {

  render() {
    return 'hello';
  }
}

ReactDOM.render(<Test />, document.getElementById('related-products'));
