import { FormEvent, useState } from "react";
import { UserModelDto } from "../interfaces/UserModelDto";
import { useDispatch } from "react-redux";
import { postNewUser } from "../state/registration/registrationSlice";

const initialRegistrationState: UserModelDto = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const useRegistration = () => {
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [registrationState, setRegistrationState] = useState<UserModelDto>(
    initialRegistrationState
  );

  const handleStateChange = (key: string, value: string): void => {
    setRegistrationState({ ...registrationState, [key]: value });
  };

  const handleSubmitRegistrationForm = (e: FormEvent) => {
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
    // Call Api
    dispatch(postNewUser(registrationState));
    // Clean up
    setRegistrationState(initialRegistrationState);
  };

  return {
    registrationState,
    errorMessage,
    handleStateChange,
    handleSubmitRegistrationForm,
  };
};
