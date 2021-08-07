import { FormEvent, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { UserModelDto } from "../interfaces/UserModelDto";
import {
  postNewUser,
  userSelector,
} from "../state/registration/registrationSlice";

const initialRegistrationState: UserModelDto = {
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
  const { userRegistrationStatus, hasErrors } = useSelector(userSelector);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [registrationState, setRegistrationState] = useState<UserModelDto>(
    initialRegistrationState
  );

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
    // Clean up
    setRegistrationState(initialRegistrationState);
  };

  useEffect(() => {
    if (userRegistrationStatus.message === "SUCCESS" && !hasErrors) {
      history.push("/registration/create-locality");
    } else {
      setErrorMessage(userRegistrationStatus.message);
    }
  }, [userRegistrationStatus, hasErrors, history]);

  return {
    registrationState,
    errorMessage,
    handleStateChange,
    handleSubmitRegistrationForm,
  };
};
