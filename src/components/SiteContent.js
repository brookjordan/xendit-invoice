import React from "react";
import Items from "./Items";
import Invoices from "./Invoices";
import Payments from "./Payments";
import Refunds from "./Refunds";
import Customers from "./Customers";
import Home from "./Home";
import {
  Switch,
  Route,
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <main className="site-content">
        <Switch>
          <Route path="/items">
            <Items />
          </Route>

          <Route path="/invoices">
            <Invoices />
          </Route>

          <Route path="/payments">
            <Payments />
          </Route>

          <Route path="/refunds">
            <Refunds />
          </Route>

          <Route path="/customers">
            <Customers />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    );
  };
}

export default App;
