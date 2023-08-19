import { FormEvent } from "react";

export interface FormValue {
  email: string;
  password: string;
  username?: string;
  passwordConfirm?: string;
}

export interface FormErrors {
  email: string;
  password: string;
  username?: string;
  passwordConfirm?: string;
}

export interface SignUpFormComponentProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formRegisterValue: FormValue;
  formErrors: FormErrors;
  handleInputValue: (e: React.ChangeEvent) => void;
  getErrorMessage: (error: string) => React.ReactNode;
  error: string;
}
