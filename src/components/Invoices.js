import React from "react";
import Invoice from "./Invoice";
import { apiURL } from "../helpers/base-url";

class App extends React.Component {
  componentDidMount() {
    fetch(`${apiURL}/invoice`)
    .then((invoiceDataBuffer) => invoiceDataBuffer.json())
    .then(invoiceData => {
      this.setState({ invoices: invoiceData });
    });
  }

  render() {
    let invoices = (this.state && this.state.invoices) || [];
    return <>
      <h2>Invoices</h2>
      <ul className="all-invoices">{
        invoices.map(invoice => (
          <Invoice key={invoice.id} invoice={invoice} />
        ))
      }</ul>
    </>;
  };
}

export default App;
