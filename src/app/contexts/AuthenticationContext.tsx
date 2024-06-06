import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
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
  const [isUserFetched, setIsUserFetched] = useState(false);

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
  const handleLogout = () => {
    const isLoggedIn = localStorage.getItem("loginData");
    if (isLoggedIn) {
      setAuthUser(null);
      localStorage.removeItem("loginData");
      navigate("/movie-app-ts");
    }
  };

  // Persistent logged in user
  useEffect(() => {
    const user = localStorage.getItem("loginData");
    if (user) {
      const existingUser = JSON.parse(user);
      const { expire, token, userId, username } = existingUser;
      const currentDate = Math.floor(Date.now() / 1000); // current time in seconds
      if (expire > currentDate) {
        setAuthUser({ username, userId, token });
      } else {
        localStorage.removeItem("loginData");
        setIsUserFetched(false);
      }
    }
    setIsUserFetched(true);
  }, []);

  const loginDataString = localStorage.getItem("loginData") ?? "{}";
  const localStorageData = JSON.parse(loginDataString);
  const userIdLocalstorage = localStorageData.userId;

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
    isUserFetched,
    userIdLocalstorage,
  };

  return (
    <AuthenticationContext.Provider value={authContextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => useContext(AuthenticationContext);
