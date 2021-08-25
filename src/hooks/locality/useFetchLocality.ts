import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userStateSelector } from "src/state/auth/login/loginSlice";
import {
  fetchCurrentUserLocality,
  localitySelector,
} from "src/state/locality/localitySlice";

export const useFetchLocality = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(userStateSelector);
  const locality = useSelector(localitySelector);

  useEffect(() => {
    dispatch(fetchCurrentUserLocality(user.localityId));
  }, []);

  return {
    locality,
    user,
  };
};
