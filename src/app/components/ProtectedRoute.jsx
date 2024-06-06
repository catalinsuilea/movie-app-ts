import React from "react";
import { useAuthenticationContext } from "../contexts/AuthenticationContext";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { authUser, isLoggedIn } = useAuthenticationContext();
  const location = useLocation();
  if (!isLoggedIn) {
    return null;
  }
  if (isLoggedIn) {
    if (!authUser) {
      return <Navigate to="/signIn" state={{ from: location }} />;
    }
  }
  return children;
};
