import React from "react";
import {
  Link,
} from "react-router-dom";
import "../styles/app.scss";

class SiteHeader extends React.Component {
  render() {
    let authButtons;
    if (this.props.user) {
      authButtons = <button onClick={this.props.logOut} className="site-header__link site-header__link--log-out">Log out</button>;
    } else {
      authButtons = <>
        <Link to="/log-in" className="site-header__link site-header__link--log-in">Log in</Link>
        <Link to="/sign-up" className="site-header__link site-header__link--sign-up">Sign up</Link>
      </>;
    }

    return (
      <header className="site-header">
        <div className="site-header__site-details">
          <h1 className="site-header__company-name" aria-label="Xendit"></h1>
          <h2 className="site-header__app-name">Invoices</h2>
        </div>

        <div className="site-header__account">
          {authButtons}
        </div>
      </header>
    );
  };
}

export default SiteHeader;
