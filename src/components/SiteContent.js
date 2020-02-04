import React from "react";
import Home from "./Home";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Items from "./Items";
import Invoices from "./Invoices";
import CreateInvoice from "./CreateInvoice";
import Payments from "./Payments";
import Refunds from "./Refunds";
import Customers from "./Customers";
import {
  Switch,
  Route,
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <main className="site-content">
        <div className="site-content__width-constrainer">
          <Switch>
            <Route path="/log-in">
              <LogIn logIn={this.props.logIn} />
            </Route>

            <Route path="/sign-up">
              <SignUp signUp={this.props.signUp} />
            </Route>

            <Route path="/items">
              <Items />
            </Route>

            <Route path="/invoices">
              <Invoices />
            </Route>

            <Route path="/create-invoice">
              <CreateInvoice user={this.props.user} />
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
              <Home user={this.props.user} />
            </Route>
          </Switch>
        </div>
      </main>
    );
  };
}

export default App;
