import React from "react";
import { apiURL } from "../helpers/base-url";

class App extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      accounts: null,
    };
  }

  componentDidMount() {
    fetch(`${apiURL}/account`, { credentials: "include" })
    .then((accountDataBuffer) => accountDataBuffer.json())
    .then(accountData => {
      this.setState({ accounts: accountData });
    });
  }

  render() {
    let accounts = this.state.accounts || [];

    return <>
      <header className="site-content__header">
        <h2 className="site-content__title">Customers</h2>

        <div className="site-content__actions">
          <button className="site-content__action">Create new customer</button>
        </div>
      </header>

      <ul className="card-list">
        {accounts.map(account => (
          <li className="card-list__card" key={account.id}>
            <div className="card-list__card-body">
              <h4 className="card-list__card-title" style={{ overflowWrap: "break-word" }}>{account.name}</h4>
              <ul>
                <li className="card-list__card-line" style={{ marginTop: "15px", overflowWrap: "break-word" }}>
                {account.email}
                </li>
              </ul>
            </div>
          </li>
        ))}
        {Array.from({ length: 5 }, (_, i) => i).map(i => (
          <li className="card-list__card--empty" key={i}></li>
        ))}
      </ul>
    </>;
  };
}

export default App;
