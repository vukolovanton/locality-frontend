import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../state/userLogin/userLoginSlice";
import "./styles.scss";

const Profile: React.FC = () => {
  const { user } = useSelector(userSelector);
  console.log(user);
  return <span className="account">{user.username || ""}</span>;
};

export default Profile;
