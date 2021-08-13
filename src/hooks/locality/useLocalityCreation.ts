import { FormEvent, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LocalityDto } from "src/interfaces/LocalityDto";
import { postNewLocality } from "src/state/locality/localityCreation/localityCreationSlice";
import { UserLoginDto } from "src/interfaces/UserLoginDto";
import {
  userLoginFetch,
  userStateSelector,
} from "src/state/auth/login/loginSlice";
import { validateObjectValues } from "src/utils/helpers";

const initialLocalityCreationState = {
  title: "",
  description: "",
  city: "",
  street: "",
};

/**
 * Registration process step #2:
 * 1. Use username and password from props to login user
 * We need to have initial login here in order to get user id
 * 2. When we get user id, we can submit locality form and assign locality id to the user
 * 3. If everything completed successfully, proceed to step #3 - login
 */
export const useLocalityCreation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<UserLoginDto>();

  const { user } = useSelector(userStateSelector);

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
    const isValid = validateObjectValues(
      localityCreationState,
      setErrorMessage
    );

    if (isValid) {
      // Call locality creation API
      dispatch(
        postNewLocality(
          { ...localityCreationState, userId: user.id },
          user.token,
          history
        )
      );
      // Clean up
      setLocalityCreationState(initialLocalityCreationState);
    }
  };

  // If we get on this page with state != undefined
  // it means we successfully completed registration
  // and we need to login in order to get new user id and token
  useEffect(() => {
    if (location.state) {
      const { username, password } = location.state;
      dispatch(userLoginFetch({ username, password }, false));
    }
    // eslint-disable-next-line
  }, []);

  return {
    localityCreationState,
    errorMessage,
    handleStateChange,
    handleSubmitCreateLocalityForm,
  };
};
