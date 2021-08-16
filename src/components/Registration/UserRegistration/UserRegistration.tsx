import React from "react";
import { useRegistration } from "src/hooks/auth/useRegistration";
import InputField from "src/components/shared/InputField";
import InputContainer from "src/components/shared/InputContainer";
import Title from "../Title";
import "../styles.scss";

const UserRegistration: React.FC = () => {
  const {
    registrationState,
    errorMessage,
    handleStateChange,
    handleSubmitRegistrationForm,
  } = useRegistration();

  return (
    <section className="container">
      <Title />
      {errorMessage && <span className="error">{errorMessage}</span>}
      <InputContainer
        legend="Create a new user"
        buttonTitle="Create user"
        handleSubmitForm={handleSubmitRegistrationForm}
      >
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

        <label htmlFor="options">
          Choose role:
          <select
            name="options"
            id="options"
            required
            onChange={(e) => handleStateChange("roles", e.target.value)}
          >
            <option value="USER">User</option>
            <option value="SUPERVISOR">Supervisor</option>
            <option value="CONTRACTOR">Contractor</option>
          </select>
        </label>
      </InputContainer>
    </section>
  );
};

export default UserRegistration;
