import React from "react";
import { Link } from "react-router-dom";
import "../styles/app.scss";

class App extends React.Component {
  render() {
    return (
      <nav className="site-navigation">
        <Link to="/items" className="site-navigation__link">Items</Link>
        <Link to="/invoices" className="site-navigation__link">Invoices</Link>
        <Link to="/payments" className="site-navigation__link">Payments</Link>
        <Link to="/refunds" className="site-navigation__link">Refunds</Link>
        <Link to="/customers" className="site-navigation__link">Customers</Link>
      </nav>
    );
  };
}

export default App;
