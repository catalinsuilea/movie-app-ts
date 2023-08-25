import React, { useState, useMemo } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Outlet, Routes, Route } from "react-router-dom";
import CarouselComponent from "../Carousel/carousel";
import {
  afterTheme,
  flexTheme,
  WelcomePageTheme,
  SearchBarTheme,
} from "../../../styles/theme";
import moviePosters from "../../../helpers/posters";
import getRandomPoster from "../../../helpers/random";
import SearchBar from "./searchBar";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";

const WelcomePage = () => {
  const { authUser } = useAuthenticationContext();

  const randomImage = useMemo(() => {
    return getRandomPoster(moviePosters);
  }, [moviePosters]);

  const displayWelcomeMessage = authUser
    ? `Welcome, ${authUser.displayName}`
    : "Welcome";

  return (
    <Box>
      <Box margin={{ base: "unset", sm: "0 5rem" }}>
        <Box
          backgroundImage={randomImage}
          {...WelcomePageTheme.moviePosterContainer}
          {...afterTheme.searchContainer}
        >
          <Flex alignItems="center" flexDirection="column">
            <Box width="81%" m="40px auto">
              <Box
                {...SearchBarTheme.welcomeText}
                fontSize={{ base: "26px", md: "36px" }}
              >
                {displayWelcomeMessage}
              </Box>
              <Box
                {...SearchBarTheme.paragraphText}
                fontSize={{ base: "22px", md: "28px" }}
              >
                Millions of movies, TV shows and people to discover.Explore now!
              </Box>
            </Box>
            <SearchBar />
          </Flex>
        </Box>
        <Outlet />
        <Box
          mt="20px"
          {...flexTheme}
          flexDirection="column"
          alignItems="flex-start"
        >
          <Box textAlign="left" fontSize="30px" letterSpacing="1.2px">
            <Text fontSize="22px" ml={{ base: "8px", md: "unset" }}>
              Newest movies
            </Text>
          </Box>
        </Box>
        <Box>
          <CarouselComponent />
        </Box>
      </Box>
    </Box>
  );
};
export default WelcomePage;
