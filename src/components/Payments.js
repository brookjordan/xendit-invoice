import React from "react";
import Payment from "./Payment";
import { apiURL } from "../helpers/base-url";

class App extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      payments: null,
    };
  }

  componentDidMount() {
    document.documentElement.style
      .setProperty("--site-bg", "var(--c-payment)");

    fetch(`${apiURL}/payment`, { credentials: "include" })
    .then((paymentDataBuffer) => paymentDataBuffer.json())
    .then(paymentData => {
      this.setState({ payments: paymentData });
    });
  }

  render() {
    let payments = this.state.payments || [];
    return <>
      <header className="site-content__header">
        <h2 className="site-content__title">Payments</h2>

        <div className="site-content__actions">
          <button className="site-content__action">Create new payment</button>
        </div>
      </header>

      <ul className="card-list">{
        payments.map(payment => (
          <Payment key={payment.id} payment={payment} />
        ))
      }</ul>
    </>;
  };
}

export default App;
