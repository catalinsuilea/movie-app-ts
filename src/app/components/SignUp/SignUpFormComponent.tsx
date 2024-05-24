import React, { useState } from "react";
import { Box, Button, Input, FormLabel } from "@chakra-ui/react";
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
    isUserNameTaken,
  } = useAuthenticationContext();
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleInputValue = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormRegisterValue({
      ...formRegisterValue,
      [(e.target! as HTMLInputElement).name]: (e.target! as HTMLInputElement)
        .value,
    });
  };

  const isRegisterForm = true;

  const onSignUpClick = async () => {
    const URL = "http://localhost:5000/auth/signup";

    if (
      Object.keys(checkInputs(formRegisterValue, isRegisterForm)).length === 0
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
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const data = await response.json();
        setErrorMsg("");
        navigate("/signIn");
      } catch (error: any) {
        setErrorMsg(error.message);
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
        {getErrorMessage(errorMsg)}
      </Box>
      <Button onClick={onSignUpClick} mt="16px">
        Submit
      </Button>
    </>
  );
};
