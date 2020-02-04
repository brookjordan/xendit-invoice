import React from "react";
import Invoice from "./Invoice";
import { Link } from "react-router-dom";
import { apiURL } from "../helpers/base-url";

class App extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      invoices: null,
    };
  }

  componentDidMount() {
    console.log(this);
    fetch(`${apiURL}/invoice`, { credentials: "include" })
    .then((invoiceDataBuffer) => invoiceDataBuffer.json())
    .then(invoiceData => {
      console.log(invoiceData);
      this.setState({ invoices: invoiceData.invoices });
    });
  }

  render() {
    let invoices = this.state.invoices || [];
    return <>
      <header className="site-content__header">
        <h2 className="site-content__title">Invoices</h2>

        <div className="site-content__actions">
          <Link to="/create-invoice" className="site-content__action">Create new invoice</Link>
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
