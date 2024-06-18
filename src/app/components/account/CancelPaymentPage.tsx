import React from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const CancelPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bg="red.100"
      padding={4}
    >
      <VStack
        spacing={6}
        bg="white"
        boxShadow="md"
        padding={8}
        borderRadius="lg"
      >
        <Heading as="h1" size="xl" color="red.600">
          Payment Canceled
        </Heading>
        <Text fontSize="lg" color="gray.700">
          Your payment was canceled. If this was a mistake, please try again.
        </Text>
        <Button colorScheme="red" as={Link} to="/">
          Go to Homepage
        </Button>
      </VStack>
    </Box>
  );
};
