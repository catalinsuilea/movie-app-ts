import React from "react";
import { useAuthenticationContext } from "../contexts/AuthenticationContext";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { authUser, isUserFetched } = useAuthenticationContext();
  const location = useLocation();

  if (!isUserFetched) {
    return null;
  }
  if (isUserFetched) {
    if (!authUser || !authUser.token) {
      return <Navigate to="/signIn" state={{ from: location }} />;
    }
  }
  return children;
};
