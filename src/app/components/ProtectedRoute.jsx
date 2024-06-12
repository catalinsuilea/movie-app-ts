import React, { useState, useEffect } from "react";
import { useAuthenticationContext } from "../contexts/AuthenticationContext";
import { Navigate, useLocation } from "react-router-dom";
import { Skeleton, Flex } from "@chakra-ui/react";

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isFetchingUserData, authUser } =
    useAuthenticationContext();
  const location = useLocation();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (!isFetchingUserData) {
      setInitialLoad(false);
    }
  }, [isFetchingUserData]);

  if (isFetchingUserData || initialLoad) {
    console.log("dada");
    return (
      <Flex
        maxWidth="1700px"
        margin="0 auto"
        flexDirection="column"
        p="2rem 0.5rem"
        gap="2.5rem"
        mt="24px"
      >
        {new Array(3).fill("").map((_, index) => (
          <Skeleton key={index} height="220px" width="100%" />
        ))}
      </Flex>
    );
  }
  if (isLoggedIn && !authUser) {
    // If the user is logged in but the authUser data is not fetched, show a loading skeleton
    return (
      <Flex
        maxWidth="1700px"
        margin="0 auto"
        flexDirection="column"
        p="2rem 0.5rem"
        gap="2.5rem"
        mt="24px"
      >
        {new Array(3).fill("").map((_, index) => (
          <Skeleton key={index} height="220px" width="100%" />
        ))}
      </Flex>
    );
  }
  if (!isLoggedIn) {
    return <Navigate to="/signIn" state={{ from: location }} />;
  }
  return children;
};
