import React from "react";

class App extends React.Component {
  componentDidMount() {
    fetch("https://xendit-invoicer.herokuapp.com/invoice_line")
    .then((invoiceLineDataBuffer) => invoiceLineDataBuffer.json())
    .then(invoiceLineData => {
      this.setState({ invoiceLines: invoiceLineData });
    });
  }

  render() {
    let invoice = this.props.invoice || {};
    let invoiceLines = (this.state && this.state.invoiceLines) || [];
    return <li className="invoice-card">
      <h4 className="invoice-card__title">{invoice.label}</h4>
      <ul>{
        invoiceLines.map(invoiceLine => (
          <li key={invoiceLine.id} className="invoice-card__line invoice-line">
            {invoiceLine.item.label} × {invoiceLine.quantity}
          </li>
        ))
      }</ul>
    </li>;
  };
}

export default App;
