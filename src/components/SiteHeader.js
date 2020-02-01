import React from "react";
import {
  Link,
} from "react-router-dom";
import "../styles/app.scss";

class SiteHeader extends React.Component {
  render() {
    let authButton;
    if (this.props.user) {
      authButton = <button onClick={this.props.logOut} className="site-header__link">Log out</button>;
    } else {
      authButton = <Link to="/log-in" className="site-header__link">Log in</Link>;
    }

    return (
      <header className="site-header">
        <div className="site-header__site-details">
          <h1 className="site-header__company-name" aria-label="Xendit"></h1>
          <h2 className="site-header__app-name">Invoices</h2>
        </div>

        <div className="site-header__account">
          {authButton}
          <Link to="/sign-up" className="site-header__link">Sign up</Link>
        </div>
      </header>
    );
  };
}

export default SiteHeader;
