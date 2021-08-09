import { FormEvent, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { UserRegistrationDto } from "../interfaces/UserRegistrationDto";
import {
  postNewUser,
  registrationUserSelector,
} from "../state/auth/registration/registrationSlice";

const initialRegistrationState: UserRegistrationDto = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const useRegistration = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userRegistrationStatus, hasErrors } = useSelector(
    registrationUserSelector
  );

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [registrationState, setRegistrationState] =
    useState<UserRegistrationDto>(initialRegistrationState);

  // Set state properties on registration form changes
  const handleStateChange = (key: string, value: string) => {
    setRegistrationState({ ...registrationState, [key]: value });
  };

  const handleSubmitRegistrationForm = async (e: FormEvent) => {
    e.preventDefault();
    // Make sure all values in there
    const values: Array<string> = Object.values(registrationState);
    values.forEach((value) => {
      if (!value) {
        setErrorMessage("Review your entities and try again");
        return;
      }
    });
    // Compare passwords
    if (registrationState.password !== registrationState.confirmPassword) {
      setErrorMessage("Passwords should match");
      return;
    }
    // Call registration API
    dispatch(postNewUser(registrationState));
  };

  useEffect(() => {
    if (userRegistrationStatus.message === "SUCCESS" && !hasErrors) {
      history.push({
        pathname: "/registration/create-locality",
        state: {
          username: registrationState.username,
          password: registrationState.password,
        },
      });
      // Clean up
      setRegistrationState(initialRegistrationState);
    } else {
      setErrorMessage(userRegistrationStatus.message);
    }
    // No eslint, I don't want to add additional dependencies, go away
    // eslint-disable-next-line
  }, [userRegistrationStatus, hasErrors, history]);

  return {
    registrationState,
    errorMessage,
    handleStateChange,
    handleSubmitRegistrationForm,
  };
};
