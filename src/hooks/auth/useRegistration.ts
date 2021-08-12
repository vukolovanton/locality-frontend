import { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { UserRegistrationDto } from "src/interfaces/UserRegistrationDto";
import {
  postNewUser,
  registrationUserSelector,
} from "src/state/auth/registration/registrationSlice";
import { validateObjectValues } from "src/utils/helpers";
import { Roles } from "../../interfaces/roles";

const initialRegistrationState: UserRegistrationDto = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  roles: [Roles.USER],
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
  const handleStateChange = (key: string, value: string | Roles) => {
    if (key === "roles") {
      setRegistrationState({ ...registrationState, roles: [value as Roles] });
      return;
    }
    setRegistrationState({ ...registrationState, [key]: value });
  };

  const handleSubmitRegistrationForm = async (e: FormEvent) => {
    e.preventDefault();
    // Make sure all values in there
    const isValid = validateObjectValues(registrationState, setErrorMessage);
    // Compare passwords
    if (registrationState.password !== registrationState.confirmPassword) {
      setErrorMessage("Passwords should match");
      return;
    }
    if (isValid) {
      // Call registration API
      dispatch(postNewUser(registrationState));
    }
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
