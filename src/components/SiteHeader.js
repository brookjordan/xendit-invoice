import React from "react";
import "../styles/app.scss";

class App extends React.Component {
  render() {
    return (
      <header className="site-header">
        <h1 className="site-header__company-name" aria-label="Xendit"></h1>
        <h2 className="site-header__app-name">Invoices</h2>
      </header>
    );
  };
}

export default App;
