import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IS_AUTHENTICATED_LOCATIONS,
  NOT_AUTHENTICATED_LOCATIONS,
  USER_FACING_LOCATIONS,
} from "src/interfaces/constants";
import "../styles.scss";

const Navigation: React.FC = () => {
  const rawLocation = useLocation();
  const currentLocation = rawLocation.pathname.split("/")[1];
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  const renderNotAuthenticated = () => (
    <>
      {NOT_AUTHENTICATED_LOCATIONS.map((location) => (
        <li key={location.value}>
          <Link to={`/${location.value}`}>{location.userFacing}</Link>
        </li>
      ))}
    </>
  );

  const renderIsAuthenticated = () => (
    <>
      {IS_AUTHENTICATED_LOCATIONS.map((location) => (
        <li key={location.value}>
          <Link to={`/${location.value}`}>{location.userFacing}</Link>
        </li>
      ))}
    </>
  );

  return (
    <nav className="nav__list">
      <li className="nav__listitem">
        {USER_FACING_LOCATIONS[currentLocation]}
        <ul className="nav__listitemdrop">
          {isAuthenticated ? renderIsAuthenticated() : renderNotAuthenticated()}
        </ul>
      </li>
    </nav>
  );
};

export default Navigation;
