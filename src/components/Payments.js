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
    fetch(`${apiURL}/payment`, { credentials: "include" })
    .then((paymentDataBuffer) => paymentDataBuffer.json())
    .then(paymentData => {
      this.setState({ payments: paymentData });
    });
  }

  render() {
    let payments = this.state.payments || [];
    return <>
      <h2 className="site-content__title">Payments</h2>

      <ul className="card-list">{
        payments.map(payment => (
          <Payment key={payment.id} payment={payment} />
        ))
      }</ul>
    </>;
  };
}

export default App;
