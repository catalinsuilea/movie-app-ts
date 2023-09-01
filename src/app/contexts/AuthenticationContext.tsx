import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { FormValue, FormErrors } from "../../types-modules/SignUpFormComponent";
import { useNavigate } from "react-router-dom";

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

  const [isSignInSubmit, setIsSignInSubmit] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [isUserNameTaken, setIsUserNameTaken] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [documentId, setDocumentId] = useState("");

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const checkUniqueUsername = async (username: string | undefined) => {
    if (!username) return false;

    const querySnapshot = await getDocs(collection(db, "users"));

    // If userInformation found, then we already have an account with the current username

    const userInformation = querySnapshot?.docs.find(
      (user: any) =>
        user?._document?.data?.value?.mapValue?.fields?.username.stringValue ===
        username
    );
    if (userInformation) {
      return true;
    } else {
      return false;
    }
  };

  const [formRegisterValue, setFormRegisterValue] =
    useState<FormValue>(registerFormValues);
  const [formRegisterErrors, setFormRegisterErrors] =
    useState<FormErrors>(registerFormValues);

  const [signInFormValues, setSignInFormValues] =
    useState<FormValue>(singInFormValues);
  const [signInFormErrors, setSignInFormErrors] =
    useState<FormErrors>(singInFormValues);

  useEffect(() => {
    if (Object.keys(formRegisterErrors).length === 0) {
      createUserWithEmailAndPassword(
        auth,
        formRegisterValue.email,
        formRegisterValue.password
      )
        .then(async (userCredential) => {
          setFormRegisterValue({
            email: "",
            password: "",
            passwordConfirm: "",
          });
          setFormRegisterErrors({
            email: "",
            password: "",
            passwordConfirm: "",
          });
          // Create the user
          // The user will be an object with an username, a userId, and an empty favourites array
          try {
            await addDoc(collection(db, "users"), {
              username: formRegisterValue.username,
              userId: userCredential.user.uid,
              favourites: [],
            });
          } catch (e) {
            console.log(e);
          }
          setError("");
          navigate("/");
        })
        .catch((err) => {
          setError(err.code);
        });
    }
  }, [formRegisterErrors]);

  useEffect(() => {
    if (Object.keys(signInFormErrors).length === 0 && isSignInSubmit) {
      setSignInFormErrors({
        email: "",
        password: "",
      });
      setSignInFormValues({
        email: "",
        password: "",
      });
      signInWithEmailAndPassword(
        auth,
        signInFormValues.email,
        signInFormValues.password
      )
        .then(() => {
          // Signed in
          navigate("/");
          setIsUserSignedIn(true);
        })
        .catch((error) => {
          const errorCode = error.code;
          setError(errorCode);
        });
    }
  }, [signInFormErrors]);

  // Handle the current user that is signed in
  // Within this useEffect, I am updating the current user object with an unique username
  // So that we can display it on the WelcomePage
  // Also I determine the unique documentId on which the user is located

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        // Get unique user data
        const querySnapshot = await getDocs(collection(db, "users"));
        const getUserName = (id: string) => {
          const userDocument = querySnapshot.docs.find((user: any) => {
            return (
              user?._document?.data?.value?.mapValue?.fields?.userId
                .stringValue === id
            );
          });

          if (userDocument) {
            return {
              userData: userDocument.data(),
              documentId: userDocument.id,
            };
          }
          return null;
        };
        const loggedUser = getUserName(auth.currentUser!.uid);
        setAuthUser(user);
        setDocumentId(loggedUser!.documentId);

        updateProfile(auth.currentUser!, {
          displayName: loggedUser?.userData.username,
        })
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
      } else {
        setAuthUser(null);
      }
    });
    return () => listen();
  }, [isUserSignedIn]);

  // Logout user

  const handleSignOut = () => {
    return signOut(auth)
      .then(() => {
        setIsUserSignedIn(false);
      })
      .catch((error) => console.log(error));
  };

  const registerData = {
    formRegisterValue,
    formRegisterErrors,
    setFormRegisterValue,
    setFormRegisterErrors,
    checkUniqueUsername,
    isUserNameTaken,
    setIsUserNameTaken,
  };

  const signInData = {
    signInFormValues,
    signInFormErrors,
    setSignInFormValues,
    setSignInFormErrors,
    setIsSignInSubmit,
  };

  const authContextValue = {
    ...registerData,
    ...signInData,
    error,
    authUser,
    handleSignOut,
    documentId,
  };

  return (
    <AuthenticationContext.Provider value={authContextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => useContext(AuthenticationContext);
