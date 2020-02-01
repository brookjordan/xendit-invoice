import React from "react";
import {
  Redirect,
} from "react-router-dom";

class App extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      name: "",
      email: "",
      password: "",
      signupError: "",
      signupWasSuccessful: false,
    };
  }

  async submitForm(event) {
    event.preventDefault();
    let {
      name,
      email,
      password,
    } = this.state;

    // For old browsers without good "required" attribute support
    if (!email) {
      this.setState({ signupError: "Email is required" });
      return;
    }
    if (!password) {
      this.setState({ signupError: "Password is required" });
      return;
    }
    // End old browser stuff

    let response;
    try {
      response = await fetch('https://xendit-invoicer.herokuapp.com/account', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((payload) => payload.json());
    } catch (error) {
      this.setState({ signupError: "The server isn’t responding." });
      throw error;
    }

    if (response.error) {
      this.setState({ signupError: response.error });
    } else {
      this.setState({ signupWasSuccessful: true });
    }
  }

  handleInputChange(inputName, event) {
    this.setState({
      [inputName]: event.currentTarget.value,
    });
  }

  render() {
    if (this.state.signupWasSuccessful === true) {
      return <Redirect to='/' />
    }

    return (
      <div className="details-form">
        <form className="details-form__form" onSubmit={this.submitForm.bind(this)}>
          <legend className="details-form__title">Sign up</legend>
          <p className="details-form__error">{this.state.signupError}</p>

          <label className="details-form__detail">
            <span className="details-form__detail-label">Full name:</span>
            <input
              className="details-form__detail-input"
              name="name"
              placeholder="John Doe"
              autoComplete="name"
              value={this.state.name}
              onChange={this.handleInputChange.bind(this, "name")}
            />
          </label>

          <label className="details-form__detail">
            <span className="details-form__detail-label">Email:</span>
            <input required
              className="details-form__detail-input"
              name="email"
              type="email"
              placeholder="me@email.co"
              autoComplete="email"
              value={this.state.email}
              onChange={this.handleInputChange.bind(this, "email")}
            />
          </label>

          <label className="details-form__detail">
            <span className="details-form__detail-label">Password:</span>
            <input required
              className="details-form__detail-input"
              name="password"
              type="password"
              autoComplete="new-password"
              value={this.state.password}
              onChange={this.handleInputChange.bind(this, "password")}
            />
          </label>

          <button className="details-form__submit">Sign me up!</button>
        </form>
      </div>
    );
  };
}

export default App;
