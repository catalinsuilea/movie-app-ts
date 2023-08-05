import React, { useState, useEffect } from "react";
import { Box, FormControl, Button, Input, FormLabel } from "@chakra-ui/react";
import "../SignUp/signup.css";
const SignUpForm = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const [formValue, setFormValue] = useState(initialValues);
  const [formErrors, setFormErrors] = useState<any>({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleInputValue = (e: React.ChangeEvent) => {
    setFormValue({
      ...formValue,
      [(e.target! as HTMLInputElement).name]: (e.target! as HTMLInputElement)
        .value,
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormErrors(checkInputs(formValue));
    setIsSubmit(true);
  };

  const checkInputs = (values: any) => {
    const errors: any = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Please type a valid email!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      {
        errors.password = "Password must be more than 4 characters!";
      }
    }
    if (!values.passwordConfirm) {
      errors.passwordConfirm = "Password Confirmation is mandatory!";
    } else if (values.passwordConfirm !== values.password) {
      errors.passwordConfirm = "Passwords does not match! ";
    }
    return errors;
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors.length === 0 && isSubmit)) {
      console.log(formValue);
    }
  }, [formErrors]);
  return (
    <FormControl display="block">
      <form onSubmit={handleSubmit}>
        <Box>
          <FormLabel m="10px 0" htmlFor="username">
            Username
          </FormLabel>
        </Box>
        <Box>
          <Input
            type="text"
            name="username"
            value={formValue.username}
            placeholder="Username"
            onChange={handleInputValue}
          />
        </Box>
        <Box color="red" mt="8px">
          {" "}
          <p>{formErrors.username}</p>
        </Box>
        <Box>
          <FormLabel m="10px 0" htmlFor="email">
            Email
          </FormLabel>
        </Box>
        <Box>
          <Input
            type="text"
            name="email"
            value={formValue.email}
            placeholder="Email"
            onChange={handleInputValue}
          />
        </Box>
        <Box color="red" mt="8px">
          {" "}
          <p>{formErrors.email}</p>
        </Box>
        <Box>
          <FormLabel m="10px 0" htmlFor="password">
            Password
          </FormLabel>
        </Box>

        <Box>
          <Input
            type="password"
            name="password"
            value={formValue.password}
            placeholder="Password"
            onChange={handleInputValue}
          />
        </Box>
        <Box color="red" mt="8px">
          <p>{formErrors.password}</p>
        </Box>
        <Box>
          <FormLabel m="10px 0" htmlFor="password">
            Password Confirm
          </FormLabel>
        </Box>
        <Box>
          <Input
            type="password"
            name="passwordConfirm"
            value={formValue.passwordConfirm}
            placeholder="Password Confirmation"
            onChange={handleInputValue}
          />
        </Box>
        <Box color="red" mt="8px">
          <p>{formErrors.passwordConfirm}</p>
        </Box>
        <Button mt="20px" type="submit">
          Submit
        </Button>
      </form>
    </FormControl>
  );
};
export default SignUpForm;
