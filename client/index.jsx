import React from 'react';
import ReactDOM from 'react-dom';

export default class Test extends React.Component {

  render() {
    return <div>hello</div>;
  }
}

ReactDOM.render(<Test />, document.getElementById('related-products'));
