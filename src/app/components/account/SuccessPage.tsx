import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import { NoPageFound } from "../common/404NotFound";

export const SuccessPage = () => {
  const { premiumToken } = useParams();
  const { fetchUserInfo } = useAuthenticationContext();
  const [checkIfPremium, setCheckIfPremium] = useState(false);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/user/check-payment-status/${premiumToken}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          const error = await response.json();
          if (error.message === "Already a premium user" || "User not found") {
            setCheckIfPremium(true);
          }

          throw new Error(`${response.statusText} ${response.status}`);
        }
        const data = await response.json();
        if (data) {
          fetchUserInfo();
          setCheckIfPremium(false);
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    };
    checkPaymentStatus();
  }, [premiumToken]);

  if (checkIfPremium) {
    return <NoPageFound />;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bg="green.100"
      padding={4}
    >
      <VStack
        spacing={6}
        bg="white"
        boxShadow="md"
        padding={8}
        borderRadius="lg"
      >
        <Heading as="h1" size="xl" color="green.600">
          Payment Successful
        </Heading>
        <Text fontSize="lg" color="gray.700">
          Thank you for your purchase! Your transaction was completed
          successfully. You are now a premium user.
        </Text>
        <Button colorScheme="green" as={Link} to="/movie-app-ts">
          Go to Homepage
        </Button>
      </VStack>
    </Box>
  );
};
