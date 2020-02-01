import React from "react";
import {
  Link,
} from "react-router-dom";
import "../styles/app.scss";

class App extends React.Component {
  render() {
    return (
      <header className="site-header">
        <div className="site-header__site-details">
          <h1 className="site-header__company-name" aria-label="Xendit"></h1>
          <h2 className="site-header__app-name">Invoices</h2>
        </div>

        <div className="site-header__account">
          {
            // <Link to="/log-in" className="site-header__link">Log in</Link>
          }
          <Link to="/sign-up" className="site-header__link">Sign up</Link>
        </div>
      </header>
    );
  };
}

export default App;
