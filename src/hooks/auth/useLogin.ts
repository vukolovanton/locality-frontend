import { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { UserLoginDto } from "src/interfaces/UserLoginDto";
import { validateObjectValues } from "src/utils/helpers";
import { userLoginFetch, userSelector } from "src/state/auth/login/loginSlice";

const initialLoginState: UserLoginDto = {
  username: "",
  password: "",
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loginState, setLoginState] = useState<UserLoginDto>(initialLoginState);

  const { isLoginSuccessfully } = useSelector(userSelector);
  console.log(isLoginSuccessfully);

  const isHasToken = Boolean(localStorage.getItem("token"));

  const handleStateChange = (key: string, value: string) => {
    setLoginState({ ...loginState, [key]: value });
  };

  const handleSubmitLoginForm = async (e: FormEvent) => {
    e.preventDefault();
    // Make sure all values in there
    validateObjectValues(loginState, setErrorMessage);
    // Send API request
    dispatch(userLoginFetch(loginState));
    setLoginState(initialLoginState);
  };

  useEffect(() => {
    if (isLoginSuccessfully || isHasToken) {
      history.push("/");
    }
  }, [history, isHasToken, isLoginSuccessfully]);

  return {
    loginState,
    errorMessage,
    handleStateChange,
    handleSubmitLoginForm,
  };
};
