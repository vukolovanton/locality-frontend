import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

type ProtectedRouteProps = {} & RouteProps;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ ...routeProps }) => {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return isAuthenticated ? <Route {...routeProps} /> : <Redirect to="/login" />;
};

export default ProtectedRoute;
