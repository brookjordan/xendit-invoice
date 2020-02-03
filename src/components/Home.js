import React from "react";

class App extends React.Component {
  render() {
    let message = this.props.user
      ? "Please use the navigation to the left to find what you’re after."
      : "Please log in or sign up with the buttons in the top right.";
    return <div className="body-text">
      <h2>Welcome to Xendit invoices</h2>
      <p>{message}</p>
    </div>;
  };
}

export default App;
