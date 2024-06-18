import React, { createContext, useState, useEffect, useContext } from "react";
import { FormErrors } from "../../types-modules/SignUpFormComponent";
import { useNavigate } from "react-router-dom";
import { AuthUser } from "../../types-modules/AuthenticatedUser";
import {
  AuthContextTypes,
  FormRegisterValues,
  FormSignInValues,
} from "../../types-modules/AuthenticationTypes/AuthenticationTypes";

const AuthenticationContext = createContext<AuthContextTypes>(
  {} as AuthContextTypes
);

export const AuthProvider = ({ children }: any) => {
  const registerFormValues = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const singInFormValues = {
    email: "",
    password: "",
  };

  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFetchingUserData, setIsFetchingUserData] = useState(true);
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  const navigate = useNavigate();

  const [formRegisterValue, setFormRegisterValue] =
    useState<FormRegisterValues>(registerFormValues);
  const [formRegisterErrors, setFormRegisterErrors] =
    useState<FormErrors>(registerFormValues);

  const [signInFormValues, setSignInFormValues] =
    useState<FormSignInValues>(singInFormValues);
  const [signInFormErrors, setSignInFormErrors] =
    useState<FormErrors>(singInFormValues);

  // Logout user
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setAuthUser(null);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoggedIn(false);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/user-info`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }
      const data = await response.json();
      const { userId, username, profile_picture } = data.user || {};

      setIsPremiumUser(data.isPremiumUser);

      setAuthUser({ userId, username, profile_picture, isPremiumUser });
      setIsLoggedIn(true);
      setIsFetchingUserData(false);
    } catch (error) {
      console.error("Error:", error);
      setAuthUser(null);
      setIsLoggedIn(false);
      setIsFetchingUserData(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [isLoggedIn, isPremiumUser]);

  const registerData = {
    formRegisterValue,
    formRegisterErrors,
    setFormRegisterValue,
    setFormRegisterErrors,
  };

  const signInData = {
    signInFormValues,
    signInFormErrors,
    setSignInFormValues,
    setSignInFormErrors,
  };
  const authContextValue = {
    ...registerData,
    ...signInData,
    authUser,
    handleLogout,
    setAuthUser,
    isLoggedIn,
    isFetchingUserData,
    fetchUserInfo,
  };

  return (
    <AuthenticationContext.Provider value={authContextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => useContext(AuthenticationContext);
