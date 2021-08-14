import React from "react";
import Navigation from "./Navigation";
import Profile from "./Profile";
import "./styles.scss";

const NavBar: React.FC = () => {
  return (
    <header className="nav">
      <h3 className="title">LOCALITY</h3>
      <Navigation />
      <Profile />
    </header>
  );
};

export default NavBar;
