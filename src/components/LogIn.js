import React from "react";

class App extends React.Component {
  render() {
    return <div className="details-form">
      <form className="details-form__form">
        <legend className="details-form__title">Log in</legend>

        <label className="details-form__detail">
          <span className="details-form__detail-label">Email:</span>
          <input className="details-form__detail-input" name="email"></input>
        </label>

        <label className="details-form__detail">
          <span className="details-form__detail-label">Password:</span>
          <input className="details-form__detail-input" name="password" type="password"></input>
        </label>

        <button className="details-form__submit">Log in</button>
      </form>
    </div>;
  };
}

export default App;
