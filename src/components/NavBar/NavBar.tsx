import React from "react";
import "./styles.scss";

const NavBar: React.FC = () => {
  return (
    <header className="nav">
      <h2>LOCALITY</h2>
      <nav className="nav__list">
        <li className="nav__listitem">
          Navigation
          <ul className="nav__listitemdrop">
            <li>Login</li>
            <li>Registration</li>
            <li>Announcements</li>
            <li>Documents</li>
            <li>Issues</li>
          </ul>
        </li>
      </nav>
      <span className="nav__account">Vukolov Anton</span>
    </header>
  );
};

export default NavBar;
