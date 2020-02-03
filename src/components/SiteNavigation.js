import React from "react";
import { Link } from "react-router-dom";
import "../styles/app.scss";

class App extends React.Component {
  render() {
    let linkClass = this.props.user
      ? "site-navigation__link"
      : "site-navigation__link site-navigation__link--disabled";

    return <nav className="site-navigation">
      <Link to="/items" className={linkClass}>Items</Link>
      <Link to="/invoices" className={linkClass}>Invoices</Link>
      <Link to="/payments" className={linkClass}>Payments</Link>
      <Link to="/refunds" className={linkClass}>Refunds</Link>
      <Link to="/customers" className={linkClass}>Customers</Link>
    </nav>;
  };
}

export default App;
