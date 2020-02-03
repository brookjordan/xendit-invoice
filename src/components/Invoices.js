import React from "react";
import Invoice from "./Invoice";
import { apiURL } from "../helpers/base-url";

class App extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      invoices: null,
    };
  }

  componentDidMount() {
    fetch(`${apiURL}/invoice`, { credentials: "include" })
    .then((invoiceDataBuffer) => invoiceDataBuffer.json())
    .then(invoiceData => {
      this.setState({ invoices: invoiceData });
    });
  }

  render() {
    let invoices = this.state.invoices || [];
    return <>
      <header className="site-content__header">
        <h2 className="site-content__title">Invoices</h2>

        <div className="site-content__actions">
          <button className="site-content__action">Create new invoice</button>
        </div>
      </header>

      <ul className="card-list">{
        invoices.map(invoice => (
          <Invoice key={invoice.id} invoice={invoice} />
        ))
      }</ul>
    </>;
  };
}

export default App;
