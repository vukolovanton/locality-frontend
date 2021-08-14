import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout, userStateSelector } from "src/state/auth/login/loginSlice";
import "./styles.scss";
import { useHistory, useLocation } from "react-router-dom";
import { purge } from "src/state/store";

const Profile: React.FC = () => {
  const { user } = useSelector(userStateSelector);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  if (
    location.pathname.includes("registration") ||
    location.pathname.includes("login")
  ) {
    return <div />;
  }

  const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Remove user from store
    dispatch(userLogout());
    purge();
    history.push("/");
  };

  return (
    <div>
      <span className="account">{user.username}</span>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Profile;
