import React, { useState } from "react";
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
  Icon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import { NoPageFound } from "../common/404NotFound";

export const ResetPasswordEmailForm = () => {
  const [emailValue, setEmailValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const { authUser } = useAuthenticationContext();

  const bg = useColorModeValue("gray.50", "gray.800");

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handleSendResetPassEmail = async () => {
    if (regex.test(emailValue) || errorMessage) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_DEPLOYED_URL}/auth/send-reset-email`,
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email: emailValue }),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const data = await response.json();
        setErrorMessage("");
        setEmailValue("");
        setSuccessMessage(data.message);
      } catch (err: any) {
        console.error(err);
        setErrorMessage(err.message);
      }
    } else {
      setErrorMessage("Email address is not from Gmail domain");
    }
  };

  if (authUser) {
    return <NoPageFound />;
  }

  return (
    <Flex minH={"80vh"} align={"center"} justify={"center"} bg={bg}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Enter your email address</Heading>
          <Text textAlign="center" fontSize={"lg"} color={"gray.600"}>
            to send you a link to change your password ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={bg} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <form>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={emailValue}
                onChange={handleInputValue}
                placeholder="Email"
              />

              <Stack spacing={2}>
                {successMessage ? (
                  <Box mt="0.5rem">
                    <Icon as={CheckCircleIcon} color="green.500" />
                    <Text
                      as="span"
                      ml="4px"
                      color="green.500"
                      textAlign="center"
                    >
                      {successMessage}
                    </Text>
                  </Box>
                ) : (
                  <Button
                    onClick={handleSendResetPassEmail}
                    bg={"blue.400"}
                    mt="1rem"
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Send
                  </Button>
                )}
                {errorMessage && (
                  <Text mt="-1rem" color="red" textAlign="left">
                    {errorMessage}
                  </Text>
                )}
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
