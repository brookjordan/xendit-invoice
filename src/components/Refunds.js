import React from "react";
import Refund from "./Refund";
import { apiURL } from "../helpers/base-url";

class App extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      refunds: null,
    };
  }

  componentDidMount() {
    fetch(`${apiURL}/refund`, { credentials: "include" })
    .then((refundDataBuffer) => refundDataBuffer.json())
    .then(refundData => {
      this.setState({ refunds: refundData });
    });
  }

  render() {
    let refunds = this.state.refunds || [];
    return <>
      <h2 className="site-content__title">refunds</h2>

      <ul className="card-list">{
        refunds.map(refund => (
          <Refund key={refund.id} refund={refund} />
        ))
      }</ul>
    </>;
  };
}

export default App;
