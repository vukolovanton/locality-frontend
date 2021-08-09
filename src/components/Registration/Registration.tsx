import React from "react";
import { useRegistration } from "src/hooks/useRegistration";
import InputField from "./InputField/InputField";
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

          <InputField
            value={registrationState.firstName}
            handleValueChange={handleStateChange}
            title="First Name"
            id="firstName"
          />
          <InputField
            value={registrationState.lastName}
            handleValueChange={handleStateChange}
            title="Last Name"
            id="lastName"
          />
          <InputField
            value={registrationState.username}
            handleValueChange={handleStateChange}
            title="Username"
            id="username"
          />
          <InputField
            value={registrationState.email}
            handleValueChange={handleStateChange}
            title="Email"
            id="email"
            inputType="email"
          />
          <InputField
            value={registrationState.password}
            handleValueChange={handleStateChange}
            title="Password"
            id="password"
            inputType="password"
          />
          <InputField
            value={registrationState.confirmPassword}
            handleValueChange={handleStateChange}
            title="Confirm Password"
            id="confirmPassword"
            inputType="confirmPassword"
          />
          <input type="submit" value="Create user" className="btn" />
        </fieldset>
      </form>
    </section>
  );
};

export default Registration;
