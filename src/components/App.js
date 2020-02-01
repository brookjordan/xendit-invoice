import React from "react";
import SiteHeader from "./SiteHeader";
import SiteNavigation from "./SiteNavigation";
import SiteContent from "./SiteContent";
import SiteFooter from "./SiteFooter";
import { store } from "../helpers/store";
import { apiURL } from "../helpers/base-url";

import {
  BrowserRouter as Router,
} from "react-router-dom";
import "../styles/app.scss";

export default class App extends React.Component {
  constructor() {
    super(...arguments);

    store.user = fetch(`${apiURL}/auth-status`, { credentials: 'include' })
    .then((payload) => payload.json())
    .then((data) => data.user);
  }

  render() {
    return (
      <Router>
        <div className="app-layout">
          <div className="app-layout__main">
            <SiteContent />
          </div>

          <div className="app-layout__header">
            <SiteHeader />
          </div>

          <div className="app-layout__navigation">
            <SiteNavigation />
          </div>

          <div className="app-layout__footer">
            <SiteFooter />
          </div>
        </div>
      </Router>
    );
  };
}
