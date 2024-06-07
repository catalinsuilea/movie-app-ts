import React, { useEffect, useState } from "react";
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
  Link,
  VStack,
  Skeleton,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { NoPageFound } from "../common/404NotFound";

export const ResetPasswordForm = ({}: any) => {
  const [passwordValue, setPasswordValue] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const bg = useColorModeValue("gray.50", "gray.800");

  const navigate = useNavigate();

  const { token, userId } = useParams();

  const handleInputValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setPasswordValue((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const handleSendResetPassEmail = async () => {
    if (
      (passwordValue.password !== "" &&
        passwordValue.confirmPassword !== "" &&
        passwordValue.password === passwordValue.confirmPassword) ||
      errorMessage
    ) {
      try {
        const payload = token
          ? {
              password: passwordValue.password,
              token: token,
            }
          : {
              password: passwordValue.password,
              userId: userId,
            };
        const response = await fetch(
          "http://localhost:5000/auth/reset/reset-password",
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const data = await response.json();
        setErrorMessage("");
        setPasswordValue({
          password: "",
          confirmPassword: "",
        });
        setSuccessMessage(data.message);
        if (userId) {
          navigate(`/user-account/${userId}`);
        } else {
          navigate("/signIn");
        }
      } catch (err: any) {
        console.error(err);
        setErrorMessage(err.message);
      }
    } else {
      setErrorMessage("Passwords don't match");
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      setIsLoading(true);
      if (!token) return;
      try {
        const response = await fetch(
          `http://localhost:5000/auth/reset/${token}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const data = await response.json();
        setIsValidToken(data.isValid);
      } catch (err: any) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, [token]);

  useEffect(() => {
    const checkUserId = async () => {
      setIsLoading(true);
      if (!userId) return;
      try {
        const response = await fetch(
          `http://localhost:5000/auth/reset/auth/${userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const data = await response.json();
        setIsValidToken(data.isValid);
      } catch (err: any) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserId();
  }, [userId]);

  if (!isValidToken) {
    return <NoPageFound isLoading={isLoading} />;
  }

  return (
    <Flex minH={"80vh"} align={"center"} justify={"center"} bg={bg}>
      <Stack width="500px" mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading textAlign="center" fontSize={"3xl"}>
            Reset your password here
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg={bg} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <form>
              <FormLabel htmlFor="password">New password</FormLabel>
              <Input
                type="password"
                name="password"
                value={passwordValue.password}
                onChange={(e) => {
                  handleInputValue(e, "password");
                }}
                placeholder="Password"
              />

              <FormLabel htmlFor="password" mt="8px">
                Confirm password
              </FormLabel>
              <Input
                type="password"
                name="passwordConfirm"
                value={passwordValue.confirmPassword}
                onChange={(e) => {
                  handleInputValue(e, "confirmPassword");
                }}
                placeholder="Confirm password"
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
                    Reset password
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
