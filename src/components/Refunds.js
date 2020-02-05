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
    document.documentElement.style
      .setProperty("--site-bg", "var(--c-refund)");

    fetch(`${apiURL}/refund`, { credentials: "include" })
    .then((refundDataBuffer) => refundDataBuffer.json())
    .then(refundData => {
      this.setState({ refunds: refundData });
    });
  }

  render() {
    let refunds = this.state.refunds || [];
    return <>
      <header className="site-content__header">
        <h2 className="site-content__title">Refunds</h2>

        <div className="site-content__actions">
          <button className="site-content__action">Create new refund</button>
        </div>
      </header>

      <ul className="card-list">{
        refunds.map(refund => (
          <Refund key={refund.id} refund={refund} />
        ))
      }</ul>
    </>;
  };
}

export default App;
