import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const NavBar: React.FC = () => {
  return (
    <header className="nav">
      <h3>LOCALITY</h3>
      <nav className="nav__list">
        <li className="nav__listitem">
          Navigation
          <ul className="nav__listitemdrop">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/registration">Registration</Link>
            </li>
            <li>
              <Link to="/announcements">Announcements</Link>
            </li>
            <li>
              <Link to="/documents">Documents</Link>
            </li>
            <li>
              <Link to="issues">Issues</Link>
            </li>
          </ul>
        </li>
      </nav>
      <span className="nav__account">Vukolov Anton</span>
    </header>
  );
};

export default NavBar;
