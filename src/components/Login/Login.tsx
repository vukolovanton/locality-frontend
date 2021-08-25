import React from "react";
import InputField from "src/components/shared/InputField";
import { useLogin } from "src/hooks/auth/useLogin";
import styles from "src/components/Registration/styles.module.scss";
import InputContainer from "../shared/InputContainer";

const Login: React.FC = () => {
  const { handleSubmitLoginForm, errorMessage, loginState, handleStateChange } =
    useLogin();

  return (
    <section className={styles.container}>
      <h3>Login to your account</h3>
      {errorMessage && <span className="error">{errorMessage}</span>}
      <InputContainer
        legend="Sign in"
        buttonTitle="Login"
        handleSubmitForm={handleSubmitLoginForm}
      >
        <InputField
          value={loginState.username}
          handleValueChange={handleStateChange}
          title="Username"
          id="username"
        />

        <InputField
          value={loginState.password}
          handleValueChange={handleStateChange}
          title="Password"
          id="password"
          inputType="password"
        />
      </InputContainer>
    </section>
  );
};

export default Login;
