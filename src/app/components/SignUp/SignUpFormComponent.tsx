import React from "react";
import { Box, FormControl, Button, Input, FormLabel } from "@chakra-ui/react";
import { checkInputs, getErrorMessage } from "../../../utils/checkFormInputs";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";

export const SignUpFormComponent = ({}) => {
  const {
    error,
    setFormRegisterValue,
    formRegisterValue,
    formRegisterErrors,
    setFormRegisterErrors,
    checkUniqueUsername,
    isUserNameTaken,
    setIsUserNameTaken,
  } = useAuthenticationContext();

  const navigate = useNavigate();

  const handleInputValue = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      setFormRegisterValue({
        ...formRegisterValue,
        [e.target.name]: e.target.value,
      });
      const isTaken = await checkUniqueUsername(e.target.value);

      setIsUserNameTaken(isTaken);
    } else {
      setFormRegisterValue({
        ...formRegisterValue,
        [(e.target! as HTMLInputElement).name]: (e.target! as HTMLInputElement)
          .value,
      });
    }
  };
  const isRegisterForm = true;

  const onSignUpClick = async () => {
    const URL = "http://localhost:5000/auth/signup";

    if (
      Object.keys(
        checkInputs(formRegisterValue, isRegisterForm, isUserNameTaken)
      ).length === 0
    ) {
      try {
        setFormRegisterErrors({});
        setFormRegisterValue({
          username: "",
          email: "",
          password: "",
          passwordConfirm: "",
        });
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: formRegisterValue.username,
            email: formRegisterValue.email,
            password: formRegisterValue.password,
          }),
        });
        if (!response.ok) {
          throw new Error(`${response.status}, ${response.statusText}`);
        }
        const data = await response.json();
        navigate("/signIn");
      } catch (err) {
        console.log(`An error occured when trying to singup:${err}`);
      }
    } else {
      setFormRegisterErrors(
        checkInputs(formRegisterValue, isRegisterForm, isUserNameTaken)
      );
    }
  };

  return (
    <>
      <Box>
        <FormLabel m="10px 0" htmlFor="username">
          Username
        </FormLabel>
      </Box>
      <Box>
        <Input
          type="text"
          name="username"
          value={formRegisterValue.username}
          placeholder="Username"
          onChange={handleInputValue}
        />
      </Box>
      <Box color="red" textAlign="left" mt="8px">
        <p>{formRegisterErrors.username}</p>
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
          value={formRegisterValue.email}
          placeholder="Email"
          onChange={handleInputValue}
        />
      </Box>
      <Box color="red" textAlign="left" mt="8px">
        {" "}
        <p>{formRegisterErrors.email}</p>
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
          value={formRegisterValue.password}
          placeholder="Password"
          onChange={handleInputValue}
        />
      </Box>
      <Box color="red" textAlign="left" mt="8px">
        <p>{formRegisterErrors.password}</p>
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
          value={formRegisterValue.passwordConfirm}
          placeholder="Password Confirmation"
          onChange={handleInputValue}
        />
      </Box>
      <Box color="red" textAlign="left" mt="8px">
        <p>{formRegisterErrors.passwordConfirm}</p>
      </Box>
      <Box color="red" textAlign="left">
        {getErrorMessage(error)}
      </Box>
      <Button onClick={onSignUpClick} mt="16px">
        Submit
      </Button>
    </>
  );
};
