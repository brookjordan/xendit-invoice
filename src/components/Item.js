import React from "react";

class App extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      invoiceLines: null,
    };
  }

  render() {
    let item = this.props.item || {};

    return <li className="card-list__card">
      <div className="card-list__card-body">
        <h4 className="card-list__card-title">{item.label}</h4>
        <ul>
          <li>Price: ${item.price}</li>
          <li>Owner: {item.account}</li>
        </ul>
      </div>
    </li>;
  };
}

export default App;
