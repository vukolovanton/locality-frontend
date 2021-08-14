import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersLocality } from "src/state/locality/localitySlice";
import { userStateSelector } from "src/state/auth/login/loginSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(userStateSelector);

  React.useEffect(() => {
    dispatch(fetchUsersLocality(user.localityId));
  }, []);
  return (
    <div>
      <h1>DICK</h1>
    </div>
  );
};

export default Home;
