import React from "react";
import { Box, FormControl, Button, Input, FormLabel } from "@chakra-ui/react";
import { checkInputs, getErrorMessage } from "../../../utils/checkFormInputs";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormRegisterErrors(
      checkInputs(formRegisterValue, isRegisterForm, isUserNameTaken)
    );
  };

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
        <Button mt="16px" type="submit">
          Submit
        </Button>
      </form>
    </FormControl>
  );
};
