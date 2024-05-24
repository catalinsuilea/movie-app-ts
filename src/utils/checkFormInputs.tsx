import { FormValue } from "../types-modules/SignUpFormComponent";

export const checkInputs = (
  values: FormValue,
  isRegisterForm = false,
  isUserNameTaken = false
) => {
  const errors: any = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!values.username && isRegisterForm) {
    errors.username = "Username is required!";
  } else if (isUserNameTaken) {
    errors.username = "Username already taken";
  }
  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!regex.test(values.email)) {
    errors.email = "Please type a valid email!";
  }
  if (!values.password) {
    errors.password = "Password is required!";
  } else if (values.password.length < 6) {
    {
      errors.password = "Password must have at least 6 characters!";
    }
  }
  if (!values.passwordConfirm && isRegisterForm) {
    errors.passwordConfirm = "Password Confirmation is mandatory!";
  } else if (values.passwordConfirm !== values.password && isRegisterForm) {
    errors.passwordConfirm = "Passwords does not match! ";
  }
  return errors;
};

export const getErrorMessage = (error: string) => {
  switch (error) {
    case "422":
      return "Invalid email or password";
    case "Username already taken.":
      return "Username already taken.";
    case "Email already taken.":
      return "Email already taken.";
    default:
      return "";
  }
};
