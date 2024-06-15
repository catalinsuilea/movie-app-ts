import { AuthUser } from "../AuthenticatedUser";
import { FormErrors } from "../SignUpFormComponent";

export interface FormRegisterValues {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface FormSignInValues {
  email: string;
  password: string;
}
export interface AuthContextTypes {
  formRegisterValue: FormRegisterValues;
  formRegisterErrors: FormErrors;
  setFormRegisterValue: React.Dispatch<
    React.SetStateAction<FormRegisterValues>
  >;
  setFormRegisterErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  signInFormValues: FormSignInValues;
  signInFormErrors: FormErrors;
  setSignInFormValues: React.Dispatch<React.SetStateAction<FormSignInValues>>;
  setSignInFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  authUser: AuthUser | null;
  isUserNameTaken?: boolean;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  isLoggedIn: boolean;
  isFetchingUserData: boolean;
  fetchUserInfo: () => void;
  handleLogout: () => Promise<void>;
}
