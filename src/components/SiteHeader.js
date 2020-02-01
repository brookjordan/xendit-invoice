import React, { useState } from "react";
import {
  Link,
} from "react-router-dom";
import { store } from "../helpers/store";
import "../styles/app.scss";

class App extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      authenticated: false,
    };
  }

  logout() {
    fetch('http://localhost:5000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
    this.setState({ authenticated: false });
    store.user = Promise.resolve();
  }

  componentDidMount() {
    store.user.then(user => {
      this.setState({ authenticated: !!user });
    });
  }

  render() {
    return (
      <header className="site-header">
        <div className="site-header__site-details">
          <h1 className="site-header__company-name" aria-label="Xendit"></h1>
          <h2 className="site-header__app-name">Invoices</h2>
        </div>

        <div className="site-header__account">
          {(() => {
            if (this.state.authenticated) {
              return <button onClick={this.logout.bind(this)} className="site-header__link">Log out</button>
            } else {
              return <Link to="/log-in" className="site-header__link">Log in</Link>
            }
          })()}
          <Link to="/sign-up" className="site-header__link">Sign up</Link>
        </div>
      </header>
    );
  };
}

export default App;
