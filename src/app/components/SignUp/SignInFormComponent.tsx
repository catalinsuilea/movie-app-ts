import React from "react";
import {
  Flex,
  Box,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import { checkInputs, getErrorMessage } from "../../../utils/checkFormInputs";
import { Link } from "react-router-dom";

export const SignInFormComponent = ({}) => {
  const {
    signInFormValues,
    signInFormErrors,
    setSignInFormErrors,
    setIsSignInSubmit,
    setSignInFormValues,
    error,
  } = useAuthenticationContext();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSignInFormErrors(checkInputs(signInFormValues));
    setIsSignInSubmit(true);
  };

  const handleInputValue = (e: React.ChangeEvent) => {
    setSignInFormValues({
      ...signInFormValues,
      [(e.target! as HTMLInputElement).name]: (e.target! as HTMLInputElement)
        .value,
    });
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
                {getErrorMessage(error)}
              </Box>

              <Stack spacing={10}>
                <Stack direction={{ base: "column" }} justify={"space-between"}>
                  <Flex justify="space-between">
                    <Text
                      fontSize={{ base: "14px", md: "16px" }}
                      color={"blue.400"}
                      cursor="pointer"
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
                  <Checkbox>Remember me</Checkbox>
                </Stack>
                <Button
                  type="submit"
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
