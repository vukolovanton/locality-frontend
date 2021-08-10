import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout, userSelector } from "src/state/auth/login/loginSlice";
import "./styles.scss";
import { useHistory } from "react-router-dom";

const Profile: React.FC = () => {
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Remove user from store
    dispatch(userLogout());
    history.push("/");
  };

  return (
    <div>
      <span className="account">{user.username || ""}</span>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Profile;
