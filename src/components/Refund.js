import React from "react";
import { apiURL } from "../helpers/base-url";

class App extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      invoiceLines: null,
    };
  }

  componentDidMount() {
    document.documentElement.style
      .setProperty("--site-bg", "var(--c-refund)");

    fetch(`${apiURL}/invoice_line/invoice/${this.props.refund.id}`, { credentials: "include" })
    .then((invoiceLineDataBuffer) => invoiceLineDataBuffer.json())
    .then(invoiceLineData => {
      this.setState({ invoiceLines: invoiceLineData.invoiceLines });
      invoiceLineData.invoiceLines.forEach((invoiceLine) => {
        if (invoiceLine.item) { return; }

        fetch(`${apiURL}/item/${invoiceLine.item_id}`, { credentials: "include" })
        .then((itemDataBuffer) => itemDataBuffer.json())
        .then((itemData) => {
          invoiceLine.item = {
            ...itemData,
            id: invoiceLine.item_id,
          };
          this.setState({ invoiceLines: this.state.invoiceLines });
        });
      });
    });
  }

  render() {
    let refund = this.props.refund || {};
    let invoiceLines = this.state.invoiceLines || [];
    let totalValueElt = (
      <p className="card-list__card-title">
        Total: …
      </p>
    );

    if (invoiceLines.every(line => !!line.item)) {
      totalValueElt = <p className="card-list__card-title">
        Total: ${
          Math.round(
            invoiceLines.reduce((acc, line) => acc + line.quantity * line.item.price, 0)
            * 100
          ) / 100
        }
      </p>;
    }

    return <li className="card-list__card">
      <div className="card-list__card-body">
        <h4 className="card-list__card-title">{refund.label}</h4>
        <ul>
          {
            invoiceLines.map(invoiceLine => {
              let inner;
              if (invoiceLine.item) {
                inner = <>
                  {invoiceLine.item.label}
                  <span> × </span>
                  {invoiceLine.quantity} = ${
                    isNaN(invoiceLine.quantity * invoiceLine.item.price)
                      ? "—"
                      : Math.round(invoiceLine.quantity * invoiceLine.item.price * 100) / 100
                  }
                </>;
              } else {
                inner = "…"
              }

              return (
                <li key={invoiceLine.id} className="card-list__card-line">
                  {inner}
                </li>
              )
            })
          }
        </ul>
      </div>
      <footer className="card-list__card-footer">
        {totalValueElt}
      </footer>
    </li>;
  };
}

export default App;
