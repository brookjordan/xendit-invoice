import React from "react";
import {
  Redirect,
} from "react-router-dom";
import { apiURL } from "../helpers/base-url";
import { store } from "../helpers/store";

class App extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      email: "",
      password: "",
      loginError: "",
      loginWasSuccessful: false,
    };
  }

  async submitForm(event) {
    event.preventDefault();
    let {
      email,
      password,
    } = this.state;

    // For old browsers without good "required" attribute support
    if (!email) {
      this.setState({ loginError: "Email is required" });
      return;
    }
    if (!password) {
      this.setState({ loginError: "Password is required" });
      return;
    }
    // End old browser stuff

    let payload;
    try {
      payload = await this.props.logIn(email, password);
    } catch (error) {
      this.setState({ loginError: "The server isn’t responding." });
      throw error;
    }

    if (payload.error) {
      this.setState({ loginError: payload.error });
    } else {
      this.setState({ loginWasSuccessful: true });
    }
  }

  handleInputChange(inputName, event) {
    this.setState({
      [inputName]: event.currentTarget.value,
    });
  }

  render() {
    if (this.state.loginWasSuccessful === true) {
      return <Redirect to="/" />
    }

    return <div className="details-form">
      <form className="details-form__form" onSubmit={this.submitForm.bind(this)}>
        <legend className="details-form__title">Log in</legend>
        <p className="details-form__error">{this.state.loginError}</p>

        <label className="details-form__detail">
          <span className="details-form__detail-label">Email:</span>
          <input required
            className="details-form__detail-input"
            name="email"
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
            value={this.state.password}
            onChange={this.handleInputChange.bind(this, "password")}
          />
        </label>

        <button className="details-form__submit">Log in.</button>
      </form>
    </div>;
  };
}

export default App;
