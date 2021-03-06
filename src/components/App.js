import React from "react";
import SiteHeader from "./SiteHeader";
import SiteNavigation from "./SiteNavigation";
import SiteContent from "./SiteContent";
import SiteFooter from "./SiteFooter";
import { apiURL } from "../helpers/base-url";

import {
  BrowserRouter as Router,
} from "react-router-dom";
import "../styles/app.scss";

export default class App extends React.Component {
  constructor() {
    super(...arguments);

    fetch(`${apiURL}/auth-status`, { credentials: "include" })
    .then((payload) => payload.json())
    .then((data) => this.setState({
      user: data.user || false,
    }));

    this.logOut = this.logOut.bind(this);
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);

    this.state = {
      user: false,
    };
  }

  logOut() {
    fetch(`${apiURL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    });
    this.setState({ user: false });
  }

  async logIn(email, password) {
    let data = await fetch(`${apiURL}/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    }).then(response => response.json());

    if (!data.error && data.user) {
      this.setState({ user: data.user });
    }

    return data;
  }

  async signUp(name, email, password) {
    let data;
    try {
      data = await fetch(`${apiURL}/account`, {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
      }).then((payload) => payload.json());
    } catch (error) {
      this.setState({ signupError: "The server isn’t responding." });
      throw error;
    }

    return data;
  }

  render() {
    return (
      <Router>
        <div className="app-layout">
          <div className="app-layout__main">
            <SiteContent user={this.state.user} logIn={this.logIn} signUp={this.signUp} />
          </div>

          <div className="app-layout__header">
            <SiteHeader user={this.state.user} logOut={this.logOut} />
          </div>

          <div className="app-layout__navigation">
            <SiteNavigation user={this.state.user} />
          </div>

          <div className="app-layout__footer">
            <SiteFooter />
          </div>
        </div>
      </Router>
    );
  };
}
