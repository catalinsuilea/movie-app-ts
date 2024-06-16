import React, { useState, useCallback } from "react";
import { Box, Button, Input, FormLabel, Spinner, Text } from "@chakra-ui/react";
import { checkInputs, getErrorMessage } from "../../../utils/checkFormInputs";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

export const SignUpFormComponent = ({}) => {
  const {
    setFormRegisterValue,
    formRegisterValue,
    formRegisterErrors,
    setFormRegisterErrors,
    isUserNameTaken,
  } = useAuthenticationContext();
  const [errorMsg, setErrorMsg] = useState("");
  const [isGmailDomain, setIsGmailDomain] = useState(true);
  const [isSubmittingUser, setIsSubmittingUser] = useState(false);

  const regex = /^[^\s@]+@gmail\.com$/i;

  const navigate = useNavigate();

  const checkEmailDomain = useCallback(
    debounce((email: string) => {
      setIsGmailDomain(regex.test(email));
    }, 500),
    []
  );
  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormRegisterValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (name === "email") {
      checkEmailDomain(value);
    }
  };

  const isRegisterForm = true;

  const onSignUpClick = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/auth/signup`;

    if (
      Object.keys(checkInputs(formRegisterValue, isRegisterForm)).length === 0
    ) {
      try {
        setIsSubmittingUser(true);
        setFormRegisterErrors({
          username: "",
          email: "",
          password: "",
          passwordConfirm: "",
        });
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
      } finally {
        setIsSubmittingUser(false);
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
        {!isGmailDomain && (
          <Box color="orange" textAlign="left" mt="8px">
            Note: For a better experience regarding sending emails and password
            reset, try using a GMAIL domain.
          </Box>
        )}
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

      <Button isDisabled={isSubmittingUser} onClick={onSignUpClick} mt="16px">
        {isSubmittingUser ? <Spinner /> : <Text>Submit</Text>}
      </Button>
    </>
  );
};
