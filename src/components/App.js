import React from "react";
import SiteHeader from "./SiteHeader";
import SiteNavigation from "./SiteNavigation";
import SiteContent from "./SiteContent";
import SiteFooter from "./SiteFooter";

import {
  BrowserRouter as Router,
} from "react-router-dom";
import "../styles/app.scss";

export default class App extends React.Component {
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
