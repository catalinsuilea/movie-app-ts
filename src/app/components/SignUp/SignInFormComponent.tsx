import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuthenticationContext } from "./AuthenticationContext";
import { checkInputs, getErrorMessage } from "../../../utils/checkFormInputs";

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
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Text color={"blue.400"}>features</Text> ✌️
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
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"blue.400"}>Forgot password?</Text>
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
