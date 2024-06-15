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
} from "@chakra-ui/react";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import { checkInputs, getErrorMessage } from "../../../utils/checkFormInputs";
import { Link, useNavigate } from "react-router-dom";

export const SignInFormComponent = ({}) => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const {
    signInFormValues,
    signInFormErrors,
    setSignInFormErrors,
    setSignInFormValues,
    setAuthUser,
    fetchUserInfo,
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
      const URL = "http://localhost:5000/auth/login";
      try {
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
          navigate("/movie-app-ts");
        }
      } catch (err: any) {
        setErrorMsg(err.message);
      }
    } else {
      setSignInFormErrors(checkInputs(signInFormValues));
    }
  };

  return (
    <Flex
      minH={"80vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text textAlign="center" fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
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
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
