import React, { createContext, useState, useEffect, useContext } from "react";
import { FormValue, FormErrors } from "../../types-modules/SignUpFormComponent";
import { useNavigate } from "react-router-dom";
import { AuthUser } from "../../types-modules/AuthenticatedUser";

const AuthenticationContext = createContext<any>({} as any);

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

  const navigate = useNavigate();

  const [formRegisterValue, setFormRegisterValue] =
    useState<FormValue>(registerFormValues);
  const [formRegisterErrors, setFormRegisterErrors] =
    useState<FormErrors>(registerFormValues);

  const [signInFormValues, setSignInFormValues] =
    useState<FormValue>(singInFormValues);
  const [signInFormErrors, setSignInFormErrors] =
    useState<FormErrors>(singInFormValues);

  // Logout user
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setAuthUser(null);
      setIsLoggedIn(false);
      navigate("/movie-app-ts");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoggedIn(false);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/user-info", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }
      const data = await response.json();
      const { userId, username } = data.user || {};
      setAuthUser({ userId, username });
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error:", error);
      setAuthUser(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [isLoggedIn]);

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
    fetchUserInfo,
  };

  return (
    <AuthenticationContext.Provider value={authContextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => useContext(AuthenticationContext);
