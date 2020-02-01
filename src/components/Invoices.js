import React from "react";
import Invoice from "./Invoice";

class App extends React.Component {
  componentDidMount() {
    fetch("https://xendit-invoicer.herokuapp.com/invoice")
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
