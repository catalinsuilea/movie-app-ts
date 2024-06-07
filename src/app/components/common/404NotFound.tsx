import React from "react";
import { Text, Box, Button, Skeleton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const NoPageFound = ({ isLoading }: any) => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="60vh"
      bg="gray.50"
      p={4}
    >
      <Skeleton
        isLoaded={!isLoading}
        textAlign="center"
        maxW="md"
        mx="auto"
        bg="white"
        p={8}
        rounded="lg"
        boxShadow="lg"
        marginTop="1.5rem"
      >
        <Text fontSize="2xl" fontWeight="bold" color="red.500">
          Oops... Looks like you arrived on the wrong page
        </Text>
        <Text marginTop="1.5rem" fontSize="lg" color="gray.600">
          Click the button below to go back to the homepage.
        </Text>
        <Button
          marginTop="1.5rem"
          colorScheme="blue"
          onClick={() => navigate("/movie-app-ts")}
          size="lg"
        >
          Go to Homepage
        </Button>
      </Skeleton>
    </Box>
  );
};
