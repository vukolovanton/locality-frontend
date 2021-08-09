import { FormEvent, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { LocalityDto } from "src/interfaces/LocalityDto";
import { postNewLocality } from "src/state/locality/localityCreation/localityCreationSlice";
import { UserLoginDto } from "src/interfaces/UserLoginDto";
import { userLoginFetch } from "src/state/auth/login/loginSlice";
import { validateObjectValues } from "src/utils/helpers";

const initialLocalityCreationState = {
  title: "",
  description: "",
  city: "",
  street: "",
};

export const useLocalityCreation = () => {
  const dispatch = useDispatch();
  const location = useLocation<UserLoginDto>();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [localityCreationState, setLocalityCreationState] =
    useState<LocalityDto>(initialLocalityCreationState);

  // Set state properties on locality registration form changes
  const handleStateChange = (key: string, value: string) => {
    setLocalityCreationState({ ...localityCreationState, [key]: value });
  };

  const handleSubmitCreateLocalityForm = async (e: FormEvent) => {
    e.preventDefault();
    // Make sure all values in there
    validateObjectValues(localityCreationState, setErrorMessage);

    if (errorMessage === "") {
      // Call locality creation API
      console.log("calling api");
      dispatch(postNewLocality(localityCreationState));
      // Clean up
      setLocalityCreationState(initialLocalityCreationState);
    }
  };

  useEffect(() => {
    if (location.state) {
      const { username, password } = location.state;
      dispatch(userLoginFetch({ username, password }));
    }
  }, [dispatch, location.state]);

  return {
    localityCreationState,
    errorMessage,
    handleStateChange,
    handleSubmitCreateLocalityForm,
  };
};
