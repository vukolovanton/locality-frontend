import React from "react";
import { Link } from "react-router-dom";
import "../styles.scss";

const Navigation: React.FC = () => {
  return (
    <nav className="nav__list">
      <li className="nav__listitem">
        Navigation
        <ul className="nav__listitemdrop">
          <li>
            <Link to="/">Home</Link>
          </li>
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
            <Link to="/issues">Issues</Link>
          </li>
        </ul>
      </li>
    </nav>
  );
};

export default Navigation;
