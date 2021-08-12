import { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { UserLoginDto } from "src/interfaces/UserLoginDto";
import { validateObjectValues } from "src/utils/helpers";
import { userLoginFetch } from "src/state/auth/login/loginSlice";

const initialLoginState: UserLoginDto = {
  username: "",
  password: "",
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loginState, setLoginState] = useState<UserLoginDto>(initialLoginState);

  const isHasToken = Boolean(localStorage.getItem("token"));

  const handleStateChange = (key: string, value: string) => {
    setLoginState({ ...loginState, [key]: value });
  };

  const handleSubmitLoginForm = async (e: FormEvent) => {
    e.preventDefault();
    // Make sure all values in there
    validateObjectValues(loginState, setErrorMessage);
    // Send API request
    dispatch(userLoginFetch(loginState, true, history));
    setLoginState(initialLoginState);
  };

  // If user already logged in, he must have token
  // If user has token, he shouldn't be able to use login page
  useEffect(() => {
    if (isHasToken) {
      history.push("/");
    }
  }, [history, isHasToken]);

  return {
    loginState,
    errorMessage,
    handleStateChange,
    handleSubmitLoginForm,
  };
};
