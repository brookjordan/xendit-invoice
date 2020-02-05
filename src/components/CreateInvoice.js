import React from "react";
import { Redirect } from "react-router-dom";
import { apiURL } from "../helpers/base-url";

class App extends React.Component {
  constructor() {
    super(...arguments);

    this.addAnotherLine = this.addAnotherLine.bind(this);
    this.createInvoice = this.createInvoice.bind(this);

    this.state = {
      items: null,
      formError: null,
      creationSuccessful: false,
      invoiceLines: [{
        id: 1,
        item: null,
        quantity: 0,
      }],
    };
  }

  componentDidMount() {
    fetch(`${apiURL}/item`, { credentials: "include" })
    .then((itemDataBuffer) => itemDataBuffer.json())
    .then(itemData => {
      this.setState({ items: itemData.items });
    });
  }

  addAnotherLine() {
    let lastLine = this.state.invoiceLines[this.state.invoiceLines.length - 1];
    this.state.invoiceLines.push({
      id: lastLine ? lastLine.id + 1 : 1,
      item: null,
      quantity: 0,
    });
    this.setState({
      invoiceLines: this.state.invoiceLines,
    });
  }

  updateQuantity(line, lineInput) {
    line.quantity = lineInput.value;
    this.setState({
      invoiceLines: this.state.invoiceLines,
    });
  }

  updateItem(line, lineInput) {
    line.item = this.state.items.find(item => item.id === +lineInput.value);
    this.setState({
      invoiceLines: this.state.invoiceLines,
    });
  }

  deleteLine(line) {
    this.state.invoiceLines.splice(this.state.invoiceLines.indexOf(line), 1);
    this.setState({
      invoiceLines: this.state.invoiceLines,
    });
  }

  async createInvoice(event) {
    event.preventDefault();

    for (let line of this.state.invoiceLines) {
      if (!line.item) {
        this.setState({ formError: "Select an item for all lines, or delete unrequired lines.", });
        return;
      }
    }

    this.setState({ formError: null, });
    let invoiceLines = this.state.invoiceLines.map(line => ({
      item: line.item.id,
      quantity: line.quantity,
    }));

    let response = await fetch(`${apiURL}/invoice`, {
      method: "POST",
      body: JSON.stringify({
        // TODO: deal with these properly
        // customer => always 0 for now
        // label => set on the server for now
        // discount => always 0 for now

        merchant: this.props.user.id,
        lines: invoiceLines,
      }),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    }).then((payload) => payload.json());

    this.setState({
      creationSuccessful: true,
    });
  }

  render() {
    if (this.state.creationSuccessful) {
      return <Redirect to="/invoices" />;
    }

    let items = this.state.items || [];

    return <form onSubmit={this.createInvoice}>
      <div className="site-content__header">
        <legend className="site-content__title">Create Invoice</legend>

        <div className="site-content__actions">
          <button className="site-content__action">Create invoice</button>
        </div>
      </div>
      <p className="site-content__error">{this.state.formError}</p>

      <ul className="card-list">{
        this.state.invoiceLines.map(line => (
          <li className="card-list__card" key={line.id}>
            <header className="card-list__card-header">
              <select
                required
                value={line.item ? line.item.id : 0}
                className="card-list__card-title"
                onChange={event => this.updateItem(line, event.currentTarget)}
              >
                <option value="0" hidden>Select an item</option>
                {items.map(item =>
                  <option value={item.id} label={item.label} key={item.id} />
                )}
              </select>
              <button
                aria-label="Delete line"
                type="button"
                onClick={() => this.deleteLine(line)}
                className="card-list__card-delete"
              >–</button>
            </header>

            <ul>
              <li className="card-list__card-line card-list__card-line--input">
                <span className="card-list__card-line-label"> × </span>
                <div className="card-list__card-line-input">
                  <input
                    required
                    pattern="[1-9]|([0-9]{2,})"
                    type="tel"
                    onChange={event => this.updateQuantity(line, event.currentTarget)}
                    value={line.quantity}
                  />
                </div>
              </li>
            </ul>
          </li>
        ))
      }</ul>
      <button type="button" className="card-list__add-another" onClick={this.addAnotherLine}>Add another item</button>

      <p className="site-content__error">{this.state.formError}</p>
      <button className="site-content__submit-button">Create invoice</button>
    </form>;
  };
}

export default App;
