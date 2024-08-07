import React, { FormEvent, useState } from "react";
import {
  Flex,
  Box,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import { checkInputs, getErrorMessage } from "../../../utils/checkFormInputs";
import { Link, useNavigate } from "react-router-dom";
import { NoPageFound } from "../common/404NotFound";

export const SignInFormComponent = ({}) => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoggingUser, setIsLoggingUser] = useState(false);

  const bg = useColorModeValue("gray.50", "gray.800");
  const bgGray = useColorModeValue("white", "gray.700");

  const {
    signInFormValues,
    signInFormErrors,
    setSignInFormErrors,
    setSignInFormValues,
    fetchUserInfo,
    authUser,
  } = useAuthenticationContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignInFormErrors(checkInputs(signInFormValues));
  };

  const handleInputValue = (e: React.ChangeEvent) => {
    setSignInFormValues({
      ...signInFormValues,
      [(e.target! as HTMLInputElement).name]: (e.target! as HTMLInputElement)
        .value,
    });
  };
  const onSignInClick = async () => {
    if (Object.keys(checkInputs(signInFormValues)).length === 0) {
      const URL = `${process.env.REACT_APP_BACKEND_DEPLOYED_URL}/auth/login`;
      try {
        setIsLoggingUser(true);
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: signInFormValues.email,
            password: signInFormValues.password,
          }),
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }

        const data = await response.json();
        if (data) {
          fetchUserInfo();
          setSignInFormValues({ email: "", password: "" });
          setErrorMsg("");
          navigate("/");
        }
      } catch (err: any) {
        setErrorMsg(err.message);
      } finally {
        setIsLoggingUser(false);
      }
    } else {
      setSignInFormErrors(checkInputs(signInFormValues));
    }
  };

  if (authUser) {
    return <NoPageFound />;
  }
  return (
    <Flex minH={"80vh"} align={"center"} justify={"center"} bg={bg}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text textAlign="center" fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={bgGray} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={signInFormValues.email}
                onChange={handleInputValue}
                placeholder="Email"
              />
              <Box textAlign="left" color="red" mt="8px">
                <p>{signInFormErrors.email}</p>
              </Box>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={signInFormValues.password}
                placeholder="Password"
                onChange={handleInputValue}
              />
              <Box textAlign="left" color="red" mt="8px">
                <p>{signInFormErrors.password}</p>
              </Box>
              <Box color="red" textAlign="left" m="12px 0">
                {getErrorMessage(errorMsg)}
              </Box>

              <Stack spacing={10}>
                <Stack direction={{ base: "column" }} justify={"space-between"}>
                  <Flex justify="space-between">
                    <Text
                      fontSize={{ base: "14px", md: "16px" }}
                      color={"blue.400"}
                      cursor="pointer"
                      onClick={() => navigate("/reset-password/sendMail")}
                    >
                      Forgot password?
                    </Text>
                    <Link to="/signUp">
                      <Text
                        color={"blue.400"}
                        cursor="pointer"
                        fontSize={{ base: "14px", md: "16px" }}
                      >
                        Register
                      </Text>
                    </Link>
                  </Flex>
                </Stack>
                <Button
                  onClick={onSignInClick}
                  isDisabled={isLoggingUser}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  {isLoggingUser ? <Spinner /> : <Text>Sign In</Text>}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
