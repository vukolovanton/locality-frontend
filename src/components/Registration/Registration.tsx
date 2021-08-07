import React from "react";
import { useRegistration } from "../../hooks/useRegistration";
import "./styles.scss";

const Registration: React.FC = () => {
  const {
    registrationState,
    errorMessage,
    handleStateChange,
    handleSubmitRegistrationForm,
  } = useRegistration();

  return (
    <section className="container">
      <h3>Welcome to Locality!</h3>
      {errorMessage && <span className="error">{errorMessage}</span>}
      <form method="post" onSubmit={handleSubmitRegistrationForm}>
        <fieldset>
          <legend>Create a new user</legend>
          <div className="input-container">
            <label htmlFor="first-name">First name</label>
            <input
              type="text"
              id="first-name"
              aria-required={true}
              value={registrationState.firstName}
              className="input-field"
              onChange={(e) => handleStateChange("firstName", e.target.value)}
            />
          </div>

          <div className="input-container">
            <label htmlFor="last-name">Last name</label>
            <input
              type="text"
              id="last-name"
              aria-required={true}
              value={registrationState.lastName}
              className="input-field"
              onChange={(e) => handleStateChange("lastName", e.target.value)}
            />
          </div>

          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              aria-required={true}
              value={registrationState.username}
              className="input-field"
              onChange={(e) => handleStateChange("username", e.target.value)}
            />
          </div>

          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              aria-required={true}
              value={registrationState.email}
              className="input-field"
              onChange={(e) => handleStateChange("email", e.target.value)}
            />
          </div>

          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              aria-required={true}
              value={registrationState.password}
              className="input-field"
              onChange={(e) => handleStateChange("password", e.target.value)}
            />
          </div>

          <div className="input-container">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              aria-required={true}
              value={registrationState.confirmPassword}
              className="input-field"
              onChange={(e) =>
                handleStateChange("confirmPassword", e.target.value)
              }
            />
          </div>

          <input type="submit" value="Create user" className="btn" />
        </fieldset>

        {/*<fieldset>*/}
        {/*  <label htmlFor="options">*/}
        {/*    Choose from the following:*/}
        {/*    <span className="required">(required)</span>*/}
        {/*    <span className="error-message">*/}
        {/*      Please choose one of the following options.*/}
        {/*    </span>*/}
        {/*    <select name="options" id="options" required="">*/}
        {/*      <option value=""> Select</option>*/}
        {/*      <option value="value1">Option A</option>*/}
        {/*      <option value="value2">Option B</option>*/}
        {/*      <option value="value3">Option C</option>*/}
        {/*    </select>*/}
        {/*  </label>*/}
        {/*</fieldset>*/}
      </form>
    </section>
  );
};

export default Registration;
