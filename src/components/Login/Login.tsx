import React from "react";
import InputField from "src/components/shared/InputField";
import { useLogin } from "src/hooks/auth/useLogin";
import "src/components/Registration/styles.scss";

const Login: React.FC = () => {
  const { handleSubmitLoginForm, errorMessage, loginState, handleStateChange } =
    useLogin();

  return (
    <section className="container">
      <h3>Login to your account</h3>
      {errorMessage && <span className="error">{errorMessage}</span>}
      <form method="post" onSubmit={handleSubmitLoginForm}>
        <fieldset>
          <legend>Login</legend>
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

          <input type="submit" value="Login" className="btn" />
        </fieldset>
      </form>
    </section>
  );
};

export default Login;
